import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument, PDFName, PDFString, StandardFonts, rgb } from 'pdf-lib'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const filename = 'mark-angelo-dela-cruz-resume.pdf'
const pdf = await PDFDocument.create()
const regular = await pdf.embedFont(StandardFonts.Helvetica)
const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
const page = pdf.addPage([612, 792])
const ink = rgb(0.09, 0.1, 0.12)
const gray = rgb(0.34, 0.36, 0.39)
const faint = rgb(0.84, 0.85, 0.87)
const left = 46
const right = 566
const width = right - left
let y = 741

pdf.setTitle('Mark Angelo Dela Cruz - Resume')
pdf.setAuthor('Mark Angelo Dela Cruz')
pdf.setSubject('Aspiring full-stack web developer and third-year BSIT student')
pdf.setKeywords(['Mark Angelo Dela Cruz', 'resume', 'full-stack web developer', 'BSIT'])
pdf.setCreator('MarkDev Portfolio')
pdf.catalog.set(PDFName.of('Lang'), PDFString.of('en-US'))

function text(value, x, baseline, size = 10, font = regular, color = ink) {
  page.drawText(value, { x, y: baseline, size, font, color })
}

function wrap(value, size, font, availableWidth = width) {
  const lines = []
  let line = ''
  for (const word of value.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(next, size) > availableWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines
}

function paragraph(
  value,
  { size = 10, leading = 15, color = gray, x = left, availableWidth = width } = {},
) {
  for (const line of wrap(value, size, regular, availableWidth)) {
    text(line, x, y, size, regular, color)
    y -= leading
  }
}

function section(label) {
  y -= 19
  text(label.toUpperCase(), left, y, 9, bold)
  page.drawLine({
    start: { x: left + 124, y: y + 3 },
    end: { x: right, y: y + 3 },
    thickness: 0.6,
    color: faint,
  })
  y -= 22
}

function link(label, url, x, baseline, size = 9.5) {
  text(label, x, baseline, size, regular, gray)
  const annotation = pdf.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [x, baseline - 2, x + regular.widthOfTextAtSize(label, size), baseline + size + 2],
    Border: [0, 0, 0],
    A: { Type: 'Action', S: 'URI', URI: PDFString.of(url) },
  })
  const ref = pdf.context.register(annotation)
  const existing = page.node.lookup(PDFName.of('Annots'))
  if (existing) existing.push(ref)
  else page.node.set(PDFName.of('Annots'), pdf.context.obj([ref]))
}

page.drawRectangle({ x: left, y: 765, width: 32, height: 4, color: ink })
text('MARK ANGELO DELA CRUZ', left, y, 25, bold)
y -= 23
text('Aspiring Full-Stack Web Developer | Third-Year BSIT Student', left, y, 10.5, regular, gray)
y -= 23
link('markangelod52@gmail.com', 'mailto:markangelod52@gmail.com', left, y)
link('github.com/geloxoxd', 'https://github.com/geloxoxd', 335, y)
y -= 10

section('Profile')
paragraph(
  'Third-year Information Technology student focused on full-stack web development, with previous IT support experience. Building practical web applications while developing skills across frontend, backend, and databases. Aiming to grow into a professional web developer.',
)

section('Technical skills')
const skillRows = [
  ['Frontend', 'HTML, CSS, JavaScript, TypeScript, React, Tailwind CSS, Vite'],
  ['Backend', 'Node.js, Express, REST APIs'],
  ['Database', 'PostgreSQL, Prisma'],
  ['Tools', 'Git, GitHub, VS Code, npm, API testing'],
  ['Exploring', 'AI integrations and automation'],
]
for (const [label, value] of skillRows) {
  text(label, left, y, 10, bold)
  paragraph(value, { x: left + 90, availableWidth: width - 90, leading: 16 })
}

section('Experience')
text('IT Support', left, y, 11, bold)
const dates = 'July 23, 2023 - August 19, 2024'
text(dates, right - regular.widthOfTextAtSize(dates, 9), y + 1, 9, regular, gray)
y -= 18
text('Concentrix', left, y, 10, regular, gray)
y -= 21
text('-', left + 2, y, 10, regular, gray)
paragraph('Diagnosed and resolved hardware, software, network, and system-related issues.', {
  x: left + 13,
  availableWidth: width - 13,
})

section('Project')
text('ClosetIQ', left, y, 11, bold)
const projectLabel = 'Full-stack clothing management'
text(projectLabel, right - regular.widthOfTextAtSize(projectLabel, 9), y + 1, 9, regular, gray)
y -= 20
paragraph(
  'Full-stack clothing management application with wardrobe and outfit management, clothing status tracking, and a rule-based stylist.',
)
y -= 2
paragraph(
  'Stack: React, Vite, TypeScript, CSS, Node.js, Express, PostgreSQL, Prisma, session-based authentication.',
  { size: 9, leading: 14 },
)
y -= 2
link('closet-iq.onrender.com', 'https://closet-iq.onrender.com', left, y, 9)
y -= 14

section('Education')
text('Bachelor of Science in Information Technology', left, y, 11, bold)
y -= 19
paragraph('ICCT Colleges - Cainta Main Campus, Rizal', { leading: 17 })
paragraph('Currently enrolled - third year', { size: 9.5, leading: 14 })

if (y < 60) throw new Error(`Resume content exceeds the bottom margin (${y.toFixed(1)} pt).`)
page.drawLine({ start: { x: left, y: 45 }, end: { x: right, y: 45 }, thickness: 0.6, color: faint })
text('MARK ANGELO DELA CRUZ', left, 29, 7, bold, gray)
text('1 / 1', right - regular.widthOfTextAtSize('1 / 1', 7), 29, 7, regular, gray)

const bytes = await pdf.save()
for (const directory of ['public', 'output/pdf']) {
  await mkdir(path.join(root, directory), { recursive: true })
  await writeFile(path.join(root, directory, filename), bytes)
}
const reopened = await PDFDocument.load(await readFile(path.join(root, 'public', filename)))
if (reopened.getPageCount() !== 1) throw new Error('Expected exactly one resume page.')
console.log(`Created ${filename}: ${bytes.length} bytes, 1 page, bottom margin ${y.toFixed(1)} pt.`)
