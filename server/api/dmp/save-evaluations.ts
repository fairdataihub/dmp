import { writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'

interface Element {
  title: string
  content: string
}

interface Evaluation {
  techCorrectScore: number | null
  completenessScore: number | null
  satisfactionScore: number | null
  selectedErrors: string[]
  additionalComments: string
}

interface RequestBody {
  elements: Element[]
  evaluations: Evaluation[]
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as RequestBody

  if (!body.elements || !body.evaluations || body.elements.length !== body.evaluations.length) {
    throw new Error('Invalid payload')
  }

  const csvHeaders = [
    'Element Title',
    'Element Content',
    'Tech Correct Score',
    'Completeness Score',
    'Satisfaction Score',
    'Selected Errors',
    'Additional Comments',
  ]

  const escapeCsv = (text: string) => `"${text.replace(/"/g, '""')}"`

  const csvRows = [
    csvHeaders.join(','),
    ...body.elements.map((el, i) => {
      const evalData = body.evaluations[i]

      return [
        escapeCsv(el.title),
        escapeCsv(el.content),
        evalData.techCorrectScore ?? '',
        evalData.completenessScore ?? '',
        evalData.satisfactionScore ?? '',
        escapeCsv(evalData.selectedErrors.join('; ')),
        escapeCsv(evalData.additionalComments),
      ].join(',')
    }),
  ]

  const csvContent = csvRows.join('\n')

  // Save to fixed folder
  const saveDir = path.resolve(process.cwd(), 'saved-evaluations')
  if (!existsSync(saveDir)) {
    mkdirSync(saveDir, { recursive: true })
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = path.join(saveDir, `evaluations-${timestamp}.csv`)

  writeFileSync(filename, csvContent)

  return { message: `Saved to ${filename}` }
})
