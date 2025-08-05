export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const {
    participantId,
    field,
    roles,
    otherRole,
    roleDuration,
    dmpCount,
    dmpReviewFrequency,
    dmsFamiliarity,
    aiUsage,
    aiComfort,
    aiAttitude,
    additionalComments,
  } = body;

  try {
    // Find existing record by participantId
    const existing = await prisma.backgroundInfo.findFirst({
      where: { participantId },
    });

    if (existing) {
      // Update existing record
      await prisma.backgroundInfo.update({
        where: { id: existing.id },
        data: {
          field,
          roles,
          otherRole,
          roleDuration,
          dmpCount,
          dmpReviewFrequency,
          dmsFamiliarity,
          aiUsage,
          aiComfort,
          aiAttitude,
          additionalComments,
        },
      });
    } else {
      // Create new record
      await prisma.backgroundInfo.create({
        data: {
          participantId,
          field,
          roles,
          otherRole,
          roleDuration,
          dmpCount,
          dmpReviewFrequency,
          dmsFamiliarity,
          aiUsage,
          aiComfort,
          aiAttitude,
          additionalComments,
        },
      });
    }

    return { message: "Background info saved successfully." };
  } catch (error) {
    console.error("Failed to save background info:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to save background info",
    });
  }
});
