import { readFileSync } from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

interface AssignmentRow {
  'Participant number': string
  DMP1: string
  DMP2: string
  DMP3: string
}

export default defineEventHandler((event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing participant ID' })
  }

  const csvPath = path.resolve('assets/dmp/participant_dmp_assignments.csv')
  const content = readFileSync(csvPath, 'utf-8')

  const records = parse(content, {
    columns: true,
    skip_empty_lines: true
  }) as AssignmentRow[]

  const participant = records.find((r: AssignmentRow) => r['Participant number'] === id)

  if (!participant) {
    throw createError({ statusCode: 404, statusMessage: `Participant ${id} not found.` })
  }

  return {
    participantId: id,
    dmps: [participant.DMP1, participant.DMP2, participant.DMP3]
  }
})
