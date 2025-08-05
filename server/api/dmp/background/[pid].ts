export default defineEventHandler(async (event) => {
  const pid = event.context.params?.pid;

  if (!pid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing participant ID",
    });
  }

  try {
    const backgroundInfo = await prisma.backgroundInfo.findFirst({
      where: {
        participantId: String(pid),
      },
    });

    return backgroundInfo ?? null;
  } catch (error) {
    console.error("Failed to fetch background info:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch background info",
    });
  }
});
