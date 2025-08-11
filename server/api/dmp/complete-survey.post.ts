export default defineEventHandler(async (event) => {
  const cookieHeader = event.node.req.headers.cookie || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("=")),
  );
  const pid = cookies.pid;

  if (!pid) {
    return { error: "No PID cookie found" };
  }

  try {
    const pidRecord = await prisma.pidAssignment.findUnique({
      where: { pid },
    });

    if (!pidRecord) {
      return { error: "PID not found" };
    }

    // Update completed = true
    await prisma.pidAssignment.update({
      where: { pid },
      data: { completed: true },
    });

    return { message: `PID ${pid} marked as completed` };
  } catch (error) {
    return { error: "Failed to update completion status" };
  }
});
