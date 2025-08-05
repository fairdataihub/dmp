export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { participantId, dmpEvaluations } = body;
  const dmp = dmpEvaluations[0];

  const evaluation = await prisma.evaluation.upsert({
    where: {
      participantId_dmpName: {
        participantId,
        dmpName: dmp.dmpName,
      },
    },
    update: {
      evaluations: dmp.evaluations,
      overallAuthorshipGuess: dmp.overallAuthorshipGuess,
      overallSatisfaction: dmp.overallSatisfaction,
    },
    create: {
      participantId,
      dmpName: dmp.dmpName,
      evaluations: dmp.evaluations,
      overallAuthorshipGuess: dmp.overallAuthorshipGuess,
      overallSatisfaction: dmp.overallSatisfaction,
    },
  });

  return { id: evaluation.id, message: "Saved successfully" };
});
