import sys
from docx import Document
sys.stdout.reconfigure(encoding="utf-8")

doc = Document(r"C:\Users\aum11\Downloads\6_Sem_Study\Bachelor_Thesis\thesis_5th_semester_report_v12.docx")
paras = [p for p in doc.paragraphs]
full = "\n".join(p.text for p in paras)
low = full.lower()

toc_idx = next(i for i, p in enumerate(paras) if p.text.strip() == "LIST OF REFERENCES")
labels = ["H1", "H2", "H3"]
# find heading indices to split body vs references
heading_idx = []
for i, p in enumerate(paras):
    if p.style.name in ("Heading 1", "Heading 2", "Heading 3"):
        heading_idx.append((i, p.style.name, p.text))
ref_start = next(i for i, p in enumerate(paras) if p.text.strip() == "LIST OF REFERENCES")
body_text = "\n".join(p.text for p in paras[:ref_start])
ref_paras = [p for p in paras[ref_start + 1:] if p.text.strip()]

print("=== leftover fabricated citations (must all be ABSENT) ===")
banned = [
    "Sproge", "BLSI", "Eglite", "Miezaine", "Sondore", "Zarina",
    "Maurer", "Bangert", "Manyika", "Ivanov", "Jannach", "Grosz",
    "State Employment Agency of Latvia", "Skills Agenda", "SIGIR",
    "word error rate", "78 percent", "15 percent through formal", "47 Latvian construction SMEs",
]
bad = [b for b in banned if b in low or b in body_text]
for b in banned:
    present = (b.lower() in body_text.lower())
    print(f"{'HIT ' if present else 'ok  '}{b}")

print("\n=== required citations (must all be PRESENT) ===")
required = [
    "Hazans, 2019", "European Labour Authority, 2025", "Granovetter, 1973",
    "Raghavan et al., 2020", "Dellermann et al., 2019",
    "Cross-Sectoral Coordination Center, 2020", "Cedefop, 2024",
    "Central Statistical Bureau of Latvia, 2021", "Amershi et al. (2019)",
    "Leavy (2018)", "Koechling & Wehner, 2020", "Srivastava et al. (2022)",
    "Settles (2012)", "Elahi et al. (2016)", "Rubens et al., 2015",
    "Monarch (2021)", "Hu et al. (2020)", "Radford et al., 2023",
    "Bocklisch et al. (2017)", "Wei et al. (2022)", "Langer et al. (2019)",
    "Iyengar & Lepper, 2000", "European Parliament and Council of the European Union, 2024",
]
missing = []
for r in required:
    present = r in body_text
    if not present:
        missing.append(r)
    print(f"{'ok  ' if present else 'MISS'}{r}")

print("\n=== reference list ===")
print("reference entries:", len(ref_paras))
entries_txt = "\n".join(p.text for p in ref_paras)
first_authors = [
    "Amershi", "Bocklisch", "Cedefop", "Central Statistical Bureau",
    "Cross-Sectoral Coordination Center", "Dellermann", "Elahi",
    "European Labour Authority", "European Parliament and Council",
    "Granovetter", "Hazans", "Hu", "Iyengar", "Koechling", "Langer",
    "Leavy", "Monarch", "Radford", "Raghavan", "Rubens", "Settles",
    "Srivastava", "Wei",
]
print("refs count matches 23:", len(ref_paras) == 23)
missing_in_refs = [a for a in first_authors if a not in entries_txt]
print("first-author surnames present in refs:", not missing_in_refs, missing_in_refs)

print("\n=== abstract consistency ===")
print("abstract says 23 references:", "23 references" in full)

print("\n=== formatting ===")
print("H1 count:", sum(1 for s, n, t in heading_idx if n == "Heading 1"))
print("H2 count:", sum(1 for s, n, t in heading_idx if n == "Heading 2"))
print("H3 count:", sum(1 for s, n, t in heading_idx if n == "Heading 3"))
xml = doc.settings.element.xml if hasattr(doc.settings.element, "xml") else ""
print("updateFields present:", "updateFields" in xml)
print("tables:", len(doc.tables))
sec = doc.sections[0]
print("page:", sec.page_width.cm, "x", sec.page_height.cm,
      "margins L/R/T/B:", sec.left_margin.cm, sec.right_margin.cm, sec.top_margin.cm, sec.bottom_margin.cm)
fn = sec.footer.paragraphs[0]
print("footer has PAGE field:", "PAGE" in fn._p.xml)
print("different first page:", sec.different_first_page_header_footer)
print("markdown artifacts:", "##" in full or "**" in full)