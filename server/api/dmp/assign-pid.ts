export default defineEventHandler(async (event) => {
  const cookieHeader = event.node.req.headers.cookie || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("=")),
  );
  const existingPid = cookies.pid;
  const now = new Date();
  const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

  function setPidCookie(pid: string) {
    const cookie = `pid=${pid}; Path=/; Max-Age=${3 * 24 * 60 * 60}; SameSite=Lax`;
    event.node.res.setHeader("Set-Cookie", cookie);
  }

  if (existingPid) {
    const pidRecord = await prisma.pidAssignment.findUnique({
      where: { pid: existingPid },
    });

    if (pidRecord) {
      const lastSeen = pidRecord.lastSeen ?? new Date(0);
      const elapsed = now.getTime() - new Date(lastSeen).getTime();

      if (elapsed <= THREE_DAYS_MS && !pidRecord.completed) {
        // Update lastSeen
        await prisma.pidAssignment.update({
          where: { pid: existingPid },
          data: { lastSeen: now },
        });

        return { pid: existingPid, message: "Existing PID returned" };
      }
    }
  }

  // Assign a new PID if no valid existing PID or expired
  const assignedCount = await prisma.pidAssignment.count({
    where: { completed: true },
  });

  if (assignedCount >= 10) {
    const expiredCutoff = new Date(now.getTime() - THREE_DAYS_MS);

    const uncompletedExpiredPid = await prisma.pidAssignment.findFirst({
      where: {
        completed: false,
        assignedAt: { not: null, lt: expiredCutoff },
      },
      orderBy: { assignedAt: "asc" },
    });

    if (uncompletedExpiredPid) {
      setPidCookie(uncompletedExpiredPid.pid);
      await prisma.pidAssignment.update({
        where: { pid: uncompletedExpiredPid.pid },
        data: { lastSeen: now, assignedAt: now },
      });

      return {
        pid: uncompletedExpiredPid.pid,
        message: "Reassigned expired uncompleted PID",
      };
    }
  }

  // Assign new unassigned PID
  const newPid = await prisma.pidAssignment.findFirst({
    where: { assignedAt: null },
  });

  if (!newPid) {
    return { error: "No more PIDs available" };
  }

  setPidCookie(newPid.pid);

  await prisma.pidAssignment.update({
    where: { pid: newPid.pid },
    data: { assignedAt: now, lastSeen: now },
  });

  return { pid: newPid.pid, message: "New PID assigned" };
});
