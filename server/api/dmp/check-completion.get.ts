// server/api/dmp/check-completion.get.ts
export default defineEventHandler(async (event) => {
  const cookieHeader = event.node.req.headers.cookie || "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("=")),
  );
  const pid = cookies.pid;

  if (!pid) {
    return { completed: false, error: "No PID cookie found" };
  }

  try {
    // Look up PID record
    const pidRecord = await prisma.pidAssignment.findUnique({
      where: { pid },
      select: { completed: true },
    });

    if (!pidRecord) {
      return { completed: false, error: "PID not found" };
    }

    // Return the completion status directly
    return { completed: pidRecord.completed };
  } catch (error) {
    console.error("Error checking completion:", error);
    return { completed: false, error: "Failed to check completion status" };
  }
});
