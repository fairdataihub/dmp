import { readFileSync } from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

interface AssignmentRow {
  'Participant number': string
  DMP1: string
  DMP2: string
  DMP3: string
}

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing participant ID' })
  }

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  const csvUrl = `${baseUrl}/assets/dmp/participant_dmp_assignments.csv`

  const res = await fetch(csvUrl)
  if (!res.ok) {
    throw createError({ statusCode: 500, statusMessage: `Failed to fetch CSV: ${res.statusText}` })
  }

  const csvText = await res.text()
  const records = parse(csvText, { columns: true, skip_empty_lines: true }) as AssignmentRow[]

  const participant = records.find((r) => r['Participant number'] === id)
  if (!participant) {
    throw createError({ statusCode: 404, statusMessage: `Participant ${id} not found.` })
  }

  return {
    participantId: id,
    dmps: [participant.DMP1, participant.DMP2, participant.DMP3]
  }
})
