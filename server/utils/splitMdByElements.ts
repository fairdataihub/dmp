export interface DmpElement {
  title: string
  subtitle: string
  content: string
}

function removeAsterisks(text: string): string {
  return text.replace(/\*\*/g, '')
}

export function splitMdByElements(mdContent: string): DmpElement[] {
  const elementPattern = /\*\*Element\s+(\d+):\s*(.+?)\*\*/g

  // Subtitle pattern:
  // Match lines starting with number + dot + space + bold subtitle (with optional colon)
  // Use (^|[\n\r]) to match start of line or string so first subtitle is matched
  const subSectionPattern = /(^|\r?\n)(\d+)\.\s*\*\*(.+?):?\*\*\s*([\s\S]*?)(?=(\r?\n\d+\.|\r?\n\*\*Element\s+\d+:|$))/g

  const elements: DmpElement[] = []

  const matches = [...mdContent.matchAll(elementPattern)]

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i]
    const next = matches[i + 1]

    const fullTitle = `Element ${current[1]}: ${current[2]}`
    const startIndex = current.index! + current[0].length
    const endIndex = next?.index ?? mdContent.length

    const blockContent = mdContent.slice(startIndex, endIndex).trim()

    let foundSubSections = false

    for (const subMatch of blockContent.matchAll(subSectionPattern)) {
      foundSubSections = true
      const subtitle = `${subMatch[2]}. ${removeAsterisks(subMatch[3])}:`.trim()
      const content = removeAsterisks(subMatch[4]).trim()

      elements.push({
        title: fullTitle,
        subtitle,
        content,
      })
    }

    if (!foundSubSections) {
      elements.push({
        title: fullTitle,
        subtitle: '',
        content: removeAsterisks(blockContent),
      })
    }
  }

  return elements
}
