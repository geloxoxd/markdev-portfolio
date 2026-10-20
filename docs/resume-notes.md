# Public resume

The public resume is generated from confirmed information in `scripts/generate-resume.mjs`. The original supplied resume is preserved and is not served by the website.

## Update

1. Edit the confirmed contact details, summary, skills, experience, project, or education in `scripts/generate-resume.mjs`.
2. Run `npm run resume`.
3. Open the generated PDF and check the full page for legibility, clipping, and correct content before deploying.

The generator writes the website download to `public/mark-angelo-dela-cruz-resume.pdf` and a matching deliverable to `output/pdf/mark-angelo-dela-cruz-resume.pdf`. It reopens the output and requires exactly one US Letter page. The email and GitHub links are clickable.

No graduation year, project results, certificates, proficiency percentages, phone number, or unconfirmed links are included. ClosetIQ is described using its inspected source features and actual development stack, with a clickable user-provided public website URL. Its private repository URL is omitted. Source inspection does not establish that protected functions were tested at runtime.

## Visual verification on Windows

The local review uses Windows' PDF rendering API because Python and Poppler are unavailable in this environment. The reusable script at `scripts/render-resume.ps1` can create a 1600-pixel-wide page image for inspection. It accepts relative paths from the current directory or absolute paths:

```powershell
powershell -NoProfile -File scripts/render-resume.ps1 -InputPdf public/mark-angelo-dela-cruz-resume.pdf -OutputDirectory tmp/pdfs
```

The page images are local QA artifacts, not website assets.

## Verification performed

- Generated and reopened the single-page US Letter PDF successfully.
- Rendered the complete final page through Windows PDF APIs at 1600 pixels wide; inspected the PNG for spacing, legibility, and clipping. No layout defects observed.
- Verified all three PDF annotations: email, GitHub profile, and ClosetIQ public website.
- Verified that the public download and deliverable copies are byte-identical.
- Ran ESLint successfully on the generator.
