import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

interface Element {
  title: string;
  content: string;
  subtitle?: string;
}

interface Evaluation {
  additionalComments: string;
  completenessScore: number | null;
  otherError?: string;
  satisfactionScore: number | null;
  selectedErrors: string[];
  techCorrectScore: number | null;
}

interface RequestBody {
  dmpName: string;
  elements: Element[];
  evaluations: Evaluation[];
}

export default defineEventHandler(async (event) => {
  try {
    const body = (await readBody(event)) as RequestBody;

    const { dmpName, elements, evaluations } = body;

    if (
      !dmpName ||
      !elements?.length ||
      !evaluations?.length ||
      elements.length !== evaluations.length
    ) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "Invalid payload structure",
        }),
      );
    }

    const csvHeaders = [
      "Element Title",
      "Element Subtitle",
      "Element Content",
      "Tech Correct Score",
      "Completeness Score",
      "Satisfaction Score",
      "Selected Errors",
      "Other Error",
      "Additional Comments",
    ];

    const escapeCsv = (text: string) =>
      `"${text.replace(/"/g, '""').replace(/\n/g, " ").slice(0, 10000)}"`;

    const csvRows = [
      csvHeaders.join(","),
      ...elements.map((el, i) => {
        const evalData = evaluations[i];

        return [
          escapeCsv(el.title),
          escapeCsv(el.subtitle || ""),
          escapeCsv(el.content),
          evalData.techCorrectScore ?? "",
          evalData.completenessScore ?? "",
          evalData.satisfactionScore ?? "",
          escapeCsv(evalData.selectedErrors?.join("; ") || ""),
          escapeCsv(evalData.otherError || ""),
          escapeCsv(evalData.additionalComments || ""),
        ].join(",");
      }),
    ];

    const csvContent = csvRows.join("\n");

    const saveDir = path.resolve(process.cwd(), "saved-evaluations");

    if (!existsSync(saveDir)) mkdirSync(saveDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${dmpName}_evaluation.csv`;
    const filepath = path.join(saveDir, filename);

    writeFileSync(filepath, csvContent);

    return { filename, message: "Evaluation saved successfully" };
  } catch (err) {
    console.error("Save error:", err);

    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: "Internal server error" }),
    );
  }
});
