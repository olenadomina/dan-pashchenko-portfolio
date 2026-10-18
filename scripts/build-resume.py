#!/usr/bin/env python3
"""Build Dan's text-based résumé from reviewed career facts and site skills."""
from __future__ import annotations

import json
import os
from pathlib import Path
import re
import shutil
import subprocess
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable, KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer,
)
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
RUNTIME = Path.home() / '.cache/codex-runtimes/codex-primary-runtime/dependencies'
NODE = os.environ.get('RESUME_NODE', str(RUNTIME / 'node/bin/node'))
FONT_DIR = Path(os.environ.get('RESUME_FONT_DIR', str(
    RUNTIME / 'native/libreoffice-headless/libreoffice/LibreOfficeDev.app/Contents/Resources/fonts/truetype'
)))
OUT = ROOT / 'output/pdf/dan-pashchenko-resume.pdf'
PUBLIC = ROOT / 'public/documents/dan-pashchenko-resume.pdf'
QA = ROOT / 'qa/resume'
TOPTAL = 'https://www.toptal.com/developers/resume/bogdan-pashchenko'
NAVY = colors.HexColor('#243746')
INK = colors.HexColor('#25313A')
MUTED = colors.HexColor('#56636D')
RULE = colors.HexColor('#CCD4D9')
NBSP = '\u00a0'

for path in (OUT.parent, PUBLIC.parent, QA):
    path.mkdir(parents=True, exist_ok=True)

for suffix, filename in (('', 'NotoSans-Regular.ttf'), ('-Bold', 'NotoSans-Bold.ttf')):
    pdfmetrics.registerFont(TTFont('ResumeSans' + suffix, str(FONT_DIR / filename)))
pdfmetrics.registerFontFamily('ResumeSans', normal='ResumeSans', bold='ResumeSans-Bold')

groups = json.loads(subprocess.check_output([
    NODE, '--input-type=module', '-e',
    "import { skillGroups } from './src/skills-data.js'; console.log(JSON.stringify(skillGroups));",
], cwd=ROOT, text=True))
skills = [skill for group in groups for skill in group['skills']]
assert len(skills) == 52 and len(set(skills)) == 52


def typeset(text: str) -> str:
    text = re.sub(r'(?<![\w\u2019\'-])([A-Za-z]{1,3}|with|from|that|this|your|into|onto|over|than|then) +', r'\1' + NBSP, text, flags=re.I)
    text = re.sub(r'(?<=\d) +(?=\d)', NBSP, text)
    text = re.sub(r'(?<!\w)(\d[\d.,]*(?:\+|%)?) +(?=[A-Za-z])', r'\1' + NBSP, text)
    return text


styles = {
    'name': ParagraphStyle('Name', fontName='ResumeSans-Bold', fontSize=27, leading=33, textColor=NAVY, spaceAfter=3),
    'role': ParagraphStyle('Role', fontName='ResumeSans', fontSize=12.5, leading=18, textColor=NAVY, spaceAfter=10),
    'contact': ParagraphStyle('Contact', fontName='ResumeSans', fontSize=9.5, leading=14.5, textColor=MUTED),
    'section': ParagraphStyle('Section', fontName='ResumeSans-Bold', fontSize=11, leading=15, textColor=NAVY, spaceBefore=17, spaceAfter=9),
    'body': ParagraphStyle('Body', fontName='ResumeSans', fontSize=10.5, leading=15, textColor=INK, spaceAfter=0, allowWidows=0, allowOrphans=0),
    'entry': ParagraphStyle('Entry', fontName='ResumeSans-Bold', fontSize=10.7, leading=15, textColor=NAVY, spaceAfter=2),
    'meta': ParagraphStyle('Meta', fontName='ResumeSans', fontSize=9.3, leading=13, textColor=MUTED, spaceAfter=4),
    'skills': ParagraphStyle('Skills', fontName='ResumeSans', fontSize=10.5, leading=15, textColor=INK, spaceAfter=9),
    'continuation': ParagraphStyle('Continuation', fontName='ResumeSans-Bold', fontSize=16, leading=21, textColor=NAVY, spaceAfter=3),
}


def p(text: str, style='body', markup=False):
    return Paragraph(text if markup else escape(typeset(text)), styles[style])


def link(label: str, href: str) -> str:
    return '<link href="' + escape(href, {'"': '&quot;'}) + '" color="#243746">' + escape(label) + '</link>'


career = [
    ('iOS Contractor', 'Independent / ios-engineer.com', '2012 - Present',
     'Built native iOS products, image and video processing systems and reliable app foundations.'),
    ('iOS Developer', 'Jenevive Health LLC', '2023 - 2025',
     'Developed an MVP into a production-ready app and delivered 28 App Store releases.'),
    ('Native iOS Developer', 'Rameez Mahmood', '2023',
     'Built a camera-based prayer-counting MVP with on-device machine learning and handled App Store submission.'),
    ('Objective-C iOS Developer', 'Penta Holdings Inc', '2023',
     'Modernised an iPad app, migrated components to Swift and maintained automated tests.'),
    ('iOS Developer', 'Konstantin Freiherr von Stein zu Nord und Ostheim', '2023',
     'Built iOS and Mac Catalyst texture tools using Core Image and Metal, with iCloud project storage.'),
    ('Senior iOS Engineer', 'Machina Technologies Pty Ltd', '2022',
     'Evaluated technical feasibility, identified MVP risks and supported vendor discussions.'),
    ('iOS Developer', 'LANDMARKS ID PTY LTD', '2022',
     'Maintained location SDKs and migrated their implementation from Objective-C to Swift.'),
    ('iOS / Swift Developer', 'Medeloop Inc.', '2022',
     'Implemented SwiftUI screens, restructured app architecture and built a ResearchKit MVP.'),
    ('Lead iOS Engineer', 'MaxSold Inc', '2021',
     'Took over an existing iOS app, improved stability and delivered major releases.'),
    ('Project Coordinator / Project Manager', 'SoftServe', '2008 - 2011',
     'Coordinated delivery, supported technical sales analysis and facilitated Agile teamwork.'),
    ('Junior C++ Developer', 'ApriorIT', '2007 - 2008',
     'Developed test infrastructure, maintained Windows driver code and investigated binaries.'),
]
assert sum(len(entry[3].split()) for entry in career) <= 200


def entry(item, compact=False):
    role, company, dates, body = item
    return KeepTogether([
        p(role, 'entry'),
        p(company + ' | ' + dates, 'meta'),
        p(body),
        Spacer(1, 8 if compact else 12),
    ])


story = [
    p('Dan Pashchenko', 'name'),
    p('Independent iOS Engineer', 'role'),
    p(link('contactiosengineer@gmail.com', 'mailto:contactiosengineer@gmail.com') +
      ' &nbsp; | &nbsp; ' + link('ios-engineer.com', 'https://ios-engineer.com/'), 'contact', True),
    p(link('linkedin.com/in/bogdanpashchenko', 'https://www.linkedin.com/in/bogdanpashchenko/') +
      ' &nbsp; | &nbsp; ' + link('github.com/truemetal', 'https://github.com/truemetal'), 'contact', True),
    Spacer(1, 12),
    HRFlowable(width='100%', thickness=.7, color=RULE),
    p('PROFILE', 'section'),
    p('20 years in IT | 13 years in iOS | 11 years in Swift | 40+ iOS apps', 'entry'),
    Spacer(1, 4),
    p('I build native apps from the first prototype and help existing products become more reliable and easier to maintain. My work covers secure authentication, passkeys, complex integrations, image and video processing and app architecture. I also have experience delivering corporate training for development teams.'),
    p('SELECTED EXPERIENCE', 'section'),
]
story.extend(entry(item) for item in career[:6])
story.extend([
    PageBreak(),
    p('Dan Pashchenko', 'continuation'),
    p('Independent iOS Engineer', 'contact'),
    p('EARLIER EXPERIENCE', 'section'),
])
story.extend(entry(item, compact=True) for item in career[6:])
story.append(p('EDUCATION', 'section'))
story.append(p("Bachelor's Degree in Computer Science", 'entry'))
story.append(p('DNUZT, Dnipropetrovsk, Ukraine | 2005 - 2009', 'meta'))
story.append(p('TECHNICAL SKILLS', 'section'))
for group in groups:
    text = '<b>' + escape(group['title']) + ':</b> ' + escape(typeset(', '.join(group['skills'])))
    story.append(p(text, 'skills', True))


def footer(canvas, doc):
    canvas.saveState()
    width, _ = A4
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(.5)
    canvas.line(44, 40, width - 44, 40)
    canvas.setFont('ResumeSans', 7.6)
    canvas.setFillColor(MUTED)
    text = 'Toptal profile: toptal.com/developers/resume/bogdan-pashchenko'
    canvas.drawString(44, 25, text)
    canvas.linkURL(TOPTAL, (44, 22, 44 + pdfmetrics.stringWidth(text, 'ResumeSans', 7.6), 33), relative=0, thickness=0)
    canvas.drawRightString(width - 44, 25, f'{doc.page} / 2')
    canvas.restoreState()


class ResumeDocument(SimpleDocTemplate):
    def afterPage(self):
        # Write footer after the body so text extraction preserves reading order.
        footer(self.canv, self)


document = ResumeDocument(
    str(OUT), pagesize=A4, rightMargin=44, leftMargin=44, topMargin=39,
    bottomMargin=54, title='Dan Pashchenko - Independent iOS Engineer',
    author='Dan Pashchenko', subject='Professional resume',
)
document.build(story)
reader = PdfReader(str(OUT))
text = '\n'.join(page.extract_text() or '' for page in reader.pages)
normalized = re.sub(r'\s+', ' ', text)
missing = [skill for skill in skills if skill not in normalized]
assert len(reader.pages) == 2, f'Expected 2 pages; got {len(reader.pages)}'
assert not missing, f'Missing skills: {missing}'
assert 'Dan Pashchenko' in normalized and 'contactiosengineer@gmail.com' in normalized
assert not re.search(r',\s+and\b', normalized, re.I)
shutil.copyfile(OUT, PUBLIC)
(QA / 'extracted-text.txt').write_text(text)
(QA / 'verification.json').write_text(json.dumps({
    'pages': len(reader.pages), 'skills_expected': 52, 'skills_found': 52,
    'missing_skills': missing, 'name_occurrences': normalized.count('Dan Pashchenko'),
    'email_occurrences': normalized.count('contactiosengineer@gmail.com'),
    'career_narrative_words': sum(len(item[3].split()) for item in career),
    'links': sum(len(page.get('/Annots', [])) for page in reader.pages),
    'bytes': OUT.stat().st_size,
}, indent=2) + '\n')
print(f'Created {PUBLIC} ({len(reader.pages)} pages, {len(skills)} skills)')
