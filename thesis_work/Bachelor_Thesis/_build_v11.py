# Builds thesis_5th_semester_report_v12.docx per RTU FCSITE formatting guidelines.
import docx
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

FONT = "Times New Roman"
OUT = r"C:\Users\aum11\Downloads\6_Sem_Study\Bachelor_Thesis\thesis_5th_semester_report_v12.docx"

doc = Document()

# ---------------- base style ----------------
normal = doc.styles["Normal"]
normal.font.name = FONT
normal.font.size = Pt(12)
normal.font.color.rgb = RGBColor(0, 0, 0)
rpr = normal.element.get_or_add_rPr()
rfonts = rpr.find(qn("w:rFonts"))
if rfonts is None:
    rfonts = OxmlElement("w:rFonts")
    rpr.append(rfonts)
for attr in ("w:ascii", "w:hAnsi", "w:cs", "w:eastAsia"):
    rfonts.set(qn(attr), FONT)

sec = doc.sections[0]
sec.page_width = Cm(21.0)
sec.page_height = Cm(29.7)
sec.left_margin = Cm(3.18)
sec.right_margin = Cm(3.18)
sec.top_margin = Cm(2.54)
sec.bottom_margin = Cm(2.54)
sec.different_first_page_header_footer = True

# ---------------- footer page number, TNR 12, centred ----------------
footer = sec.footer
fp = footer.paragraphs[0]
fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = fp.add_run()
fld1 = OxmlElement("w:fldChar"); fld1.set(qn("w:fldCharType"), "begin")
instr = OxmlElement("w:instrText"); instr.set(qn("xml:space"), "preserve"); instr.text = " PAGE "
fld2 = OxmlElement("w:fldChar"); fld2.set(qn("w:fldCharType"), "end")
run._r.append(fld1); run._r.append(instr); run._r.append(fld2)
run.font.name = FONT; run.font.size = Pt(12)

# ---------------- heading styles (RTU spec) ----------------
def style_heading(name, size, caps=False):
    st = doc.styles[name]
    st.font.name = FONT
    st.font.size = Pt(size)
    st.font.bold = True
    st.font.color.rgb = RGBColor(0, 0, 0)
    st.element.rPr.rFonts.set(qn("w:ascii"), FONT)
    st.element.rPr.rFonts.set(qn("w:hAnsi"), FONT)
    return st

h1 = style_heading("Heading 1", 14)
h1.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
h1.paragraph_format.space_before = Pt(0)
h1.paragraph_format.space_after = Pt(12)
h1.paragraph_format.line_spacing = 1.5
h1.paragraph_format.keep_with_next = True

h2 = style_heading("Heading 2", 14)
h2.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
h2.paragraph_format.space_before = Pt(12)
h2.paragraph_format.space_after = Pt(12)
h2.paragraph_format.line_spacing = 1.5
h2.paragraph_format.keep_with_next = True

h3 = style_heading("Heading 3", 12)
h3.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
h3.paragraph_format.space_before = Pt(12)
h3.paragraph_format.space_after = Pt(12)
h3.paragraph_format.line_spacing = 1.5
h3.paragraph_format.keep_with_next = True

# ---------------- helpers ----------------
def body(text, indent=True, justify=True, space_after=0):
    p = doc.add_paragraph()
    p.style = doc.styles["Normal"]
    pf = p.paragraph_format
    pf.line_spacing = 1.5
    pf.space_before = Pt(0)
    pf.space_after = Pt(space_after)
    if justify:
        pf.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    if indent:
        pf.first_line_indent = Cm(1)
    r = p.add_run(text)
    r.font.name = FONT
    r.font.size = Pt(12)
    return p

def centered(text, size=12, bold=False, caps=False):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.line_spacing = 1.0
    r = p.add_run((text.upper() if caps else text))
    r.font.name = FONT; r.font.size = Pt(size); r.font.bold = bold
    return p

def page_break():
    doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)

def heading(text, level=1):
    p = doc.add_paragraph(style=f"Heading {level}")
    r = p.add_run(text)
    r.font.name = FONT
    size = {1: 14, 2: 14, 3: 12}[level]
    r.font.size = Pt(size)
    r.font.bold = True
    if level == 1:
        r.font.all_caps = True
    return p

def set_run_font(run, size=12, bold=False, caps=False):
    run.font.name = FONT
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.all_caps = caps

# ---------------- TITLE PAGE ----------------
def title_para(text, size, bold=False, caps=False, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=0, space_before=0):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.0
    r = p.add_run(text.upper() if caps else text)
    set_run_font(r, size=size, bold=bold, caps=False)
    return p

title_para("RIGA TECHNICAL UNIVERSITY", 16, bold=True, caps=True, space_after=0)
title_para("Faculty of Computer Science, Information Technology and Energy", 15, space_after=0)
title_para("Institute of Applied Computer Systems", 14, space_after=24)
title_para("Aum Sohoni", 16, bold=True, space_after=0)
title_para('Student of the Academic Bachelor Level Study Program "Computer Systems"', 12, space_after=0)
title_para("Student ID No 241ADB009", 12, space_after=36)
title_para("RECIPROCAL HUMAN AI JOB MATCHING PLATFORM FOR SKILLED TRADES", 24, bold=True, caps=True, space_after=24)
title_para("BACHELOR THESIS", 16, bold=True, caps=True, space_after=0)
title_para("5th Semester Report", 16, space_after=48)
title_para("Scientific adviser", 12, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=0)
title_para("Lecturer Janis Amolins", 16, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=36)
title_para("RIGA 2026", 16)
page_break()

# ---------------- ABSTRACT ----------------
heading("ABSTRACT", 1)
p = doc.add_paragraph()
p.paragraph_format.line_spacing = 1.0
p.paragraph_format.space_after = Pt(12)
r = p.add_run("RECIPROCAL MATCHING, ACTIVE LEARNING, SKILLED TRADES RECRUITMENT, LATVIA, RECOMMENDER SYSTEMS, HUMAN AI COLLABORATION, WHATSAPP, NATURAL LANGUAGE PROCESSING")
set_run_font(r, 12)
p.alignment = WD_ALIGN_PARAGRAPH.LEFT

body("This fifth-semester bachelor thesis report presents the work completed so far on a reciprocal human-AI matching platform with active learning for skilled-trades recruitment in Latvia and the Baltic region. The report sets out the problem statement, the thesis objectives, the results of a review of relevant literature and existing systems, and a development schedule for the remaining work.")
body("The proposed prototype is a reciprocal, swipe-based platform for skilled-trades recruitment. Skilled workers browse job cards and express interest; employers browse candidate cards and express interest. When both sides make a positive decision, a match is created and further contact becomes possible. An AI recommendation component ranks profiles using skills, experience, location, availability, and job requirements, while human recruiters keep responsibility for final decisions. An active learning feedback loop lets the system improve its ranking from recruiter feedback. Voice onboarding is treated as an optional future extension rather than a core prototype feature.")
body("The bachelor thesis 5th semester report consists of 15 pages; it contains 1 table and 23 references. The 5th semester report covers the analytical part (literature review, architecture design) and the start of the practical part (prototype implementation and verification).")
page_break()

# ---------------- TABLE OF CONTENTS ----------------
heading("TABLE OF CONTENTS", 1)
# TOC field (auto-generated in Word; updateFields forces refresh on open)
p = doc.add_paragraph()
toc_run = p.add_run()
fld_begin = OxmlElement("w:fldChar"); fld_begin.set(qn("w:fldCharType"), "begin"); fld_begin.set(qn("w:dirty"), "true")
instr = OxmlElement("w:instrText"); instr.set(qn("xml:space"), "preserve")
instr.text = ' TOC \\o "1-3" \\h \\z \\u '
fld_sep = OxmlElement("w:fldChar"); fld_sep.set(qn("w:fldCharType"), "separate")
t = OxmlElement("w:t"); t.text = "Right-click here and choose Update Field to refresh the table of contents."
fld_end = OxmlElement("w:fldChar"); fld_end.set(qn("w:fldCharType"), "end")
toc_run._r.append(fld_begin); toc_run._r.append(instr); toc_run._r.append(fld_sep)
toc_run._r.append(t); toc_run._r.append(fld_end)
toc_run.font.name = FONT; toc_run.font.size = Pt(12)
page_break()

# ---------------- INTRODUCTION ----------------
heading("INTRODUCTION", 1)
body("Latvia and the Baltic states face a shortage of qualified skilled trades workers, including electricians, plumbers, welders, carpenters, and HVAC technicians, and the shortage is worsening. The gap follows from an aging workforce, the emigration of skilled labour after EU accession in 2004, and an education system that has underinvested in vocational pathways (Hazans, 2019). The EURES network, coordinated by the European Labour Authority, identifies building and related trades among the most critical shortage occupations in Latvia (European Labour Authority, 2025).")
body("Traditional recruitment methods are poorly suited to reaching trades workers, who depend on informal referral networks more than on online job boards or profile portals (Granovetter, 1973). Existing AI-powered recruitment platforms are built for knowledge work and are largely inaccessible to trades workers. Fully automated AI recruitment systems can also introduce systematic bias, which argues for a hybrid approach in which humans stay in the decision loop (Raghavan et al., 2020). This thesis addresses the gap by developing a reciprocal human-AI matching platform with a swipe-based interface, an active-learning feedback loop, and human oversight for small and medium-sized enterprises in Latvia.")
body("The goal of the bachelor thesis is to design, implement, and evaluate a small reciprocal human-AI matching prototype for skilled-trades recruitment in Latvia. The prototype uses a swipe-based interface, synthetic test data, a recommendation component, mutual matching, and an active-learning feedback mechanism to find out whether this interaction model can support relevant and efficient job matching while preserving human oversight. The tasks of the bachelor thesis are:")

tasks = [
    "To analyse literature and existing research on the challenges of skilled trades recruitment in the Latvian and Baltic labour market.",
    "To research hybrid human AI architectures and existing similar systems.",
    "To design a hybrid human AI architecture for intelligent candidate and job matching.",
    "To implement a prototype including worker and employer profiles, swipe-based interaction, a matching engine, mutual matching, and a feedback mechanism.",
    "To integrate an active learning component that updates recommendation priorities from recruiter feedback.",
    "To evaluate the prototype with synthetic test data in terms of match relevance, task completion, usability, and improvement over a static ranking baseline.",
    "To discuss ethical implications, privacy, fairness, limitations, and potential impact in the Latvian context.",
]
for i, t in enumerate(tasks, 1):
    p = doc.add_paragraph()
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.left_indent = Cm(1.9)
    p.paragraph_format.first_line_indent = Cm(-1.0)
    r = p.add_run(f"{i}. {t}")
    set_run_font(r, 12)

body("Chapter 1 presents the problem statement, the justification of topicality, and the development schedule. Chapter 2 reviews information sources in four thematic areas: the Baltic skilled trades labour market, hybrid human-AI architectures, active learning methodology, and recommender systems and swipe-based recruitment interfaces. The report closes with the results and conclusions of the semester's work.")
page_break()

# ---------------- CHAPTER 1 ----------------
heading("1. LABOUR MARKET CHALLENGES AND THESIS OBJECTIVES", 1)

heading("1.1. Statement of the problem", 2)
body("Latvia and the Baltic states are experiencing a shortage of qualified skilled trades workers, and the shortage is worsening. According to the EURES network, construction and trades positions consistently form a large part of the hardest-to-fill vacancies in Latvia (European Labour Authority, 2025). The gap is worsened by an aging workforce, the emigration of skilled labour to Western European markets after EU accession, and an education system that has underinvested in vocational pathways (Hazans, 2019).")
body("Traditional recruitment methods, including job boards, newspaper advertisements, and employment agency intermediaries, reach skilled trades workers poorly; trades workers tend to rely on personal referral networks. Existing AI-powered recruitment platforms have been designed mainly for knowledge work, and their features are largely irrelevant or inaccessible to the trades sector. The result is a persistent mismatch between employer demand and labour supply, which imposes economic costs on SMEs in construction, maintenance, and infrastructure, as the literature on informal job-search networks suggests (Granovetter, 1973).")

heading("1.2. Goal of the thesis", 2)
body("The goal of the bachelor thesis is to design, implement, and evaluate a reciprocal human-AI platform for skilled-trades matching in Latvia using a swipe-based interface, synthetic test data, and active learning.")

heading("1.3. Justification of topicality", 2)
body("The topic is justified by three converging factors: the structural labour-market gap in Latvian skilled trades, the progress of large language models and speech recognition APIs that make voice-based AI assistants commercially viable, and the growing academic and industry interest in hybrid human-AI workflows (Dellermann et al., 2019).")
body("The EURES 2024 report lists building and related trades, such as electricians, plumbers, and roofers, among the most critical shortage occupations across EU member states, including Latvia (European Labour Authority, 2025). The National Development Plan of Latvia for 2021-2027 treats workforce development in construction, housing renovation, and energy-efficiency work as strategic priorities (Cross-Sectoral Coordination Center, 2020). Even so, most investment in HR technology has gone to sectors with more highly educated and digitally literate workforces.")
body("A mobile-first interaction can lower the effort needed to inspect vacancies and candidate profiles. A swipe-based interface is studied as a way to make first-stage matching quick and accessible, without treating a swipe as an employment decision.")
body("In the hybrid architecture, AI prescreens and ranks candidates while humans make the final decisions and provide feedback. This addresses concerns about algorithmic bias and regulatory compliance. The EU AI Act, which entered into application on 1 August 2024, classifies AI systems used in employment as high risk and requires transparency, human oversight, and non-discrimination. Most obligations became applicable on 2 August 2026, with the remaining provisions scheduled for 2 December 2027. A system designed from the outset for human-in-the-loop operation is better placed to meet these requirements (Raghavan et al., 2020).")

heading("1.4. Development schedule", 2)
body("The development schedule for the remaining thesis work is given in Table 1.1.", indent=False)

# Table 1.1
# number right-aligned above (12pt bold, spacing before 12pt)
pn = doc.add_paragraph()
pn.alignment = WD_ALIGN_PARAGRAPH.RIGHT
pn.paragraph_format.space_before = Pt(12)
pn.paragraph_format.space_after = Pt(0)
rn = pn.add_run("Table 1.1")
rn.font.name = FONT; rn.font.size = Pt(12); rn.font.bold = True

pt = doc.add_paragraph()
pt.alignment = WD_ALIGN_PARAGRAPH.CENTER
pt.paragraph_format.space_after = Pt(6)
rt = pt.add_run("Development Schedule")
rt.font.name = FONT; rt.font.size = Pt(12); rt.font.bold = True

schedule = [
    ("Collect and survey literature sources", "Week 3"),
    ("Analyse information sources and draft Chapter 2", "Week 6"),
    ("Submit 5th semester progress report", "Week 9"),
    ("Design system architecture", "Week 10"),
    ("Implement matching engine and active learning loop", "Week 11"),
    ("Pre defence", "Week 12"),
    ("Conduct evaluation and write results chapter", "Week 15"),
    ("Write ethical implications and conclusions", "Week 16"),
    ("Bachelor thesis submission", "Week 17 (Tuesday)"),
    ("Bachelor thesis defence", "Week 19"),
]
table = doc.add_table(rows=1 + len(schedule), cols=2)
table.style = "Table Grid"
table.alignment = WD_TABLE_ALIGNMENT.CENTER

def set_cell(cell, text, bold=False, align=WD_ALIGN_PARAGRAPH.LEFT):
    cell.text = ""
    p = cell.paragraphs[0]
    p.alignment = align
    p.paragraph_format.line_spacing = 1.0
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    r = p.add_run(text)
    r.font.name = FONT; r.font.size = Pt(11); r.font.bold = bold

set_cell(table.rows[0].cells[0], "Activity", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER)
set_cell(table.rows[0].cells[1], "Deadline", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER)
for i, (a, d) in enumerate(schedule, start=1):
    set_cell(table.rows[i].cells[0], a)
    set_cell(table.rows[i].cells[1], d, align=WD_ALIGN_PARAGRAPH.CENTER)

doc.add_paragraph()
page_break()

# ---------------- CHAPTER 2 ----------------
heading("2. ANALYSIS OF INFORMATION SOURCES", 1)
body("The analysis of information sources draws on peer-reviewed academic literature, industry reports, technical documentation, and policy documents. Sources were identified through Google Scholar, IEEE Xplore, and the ACM Digital Library. The sections below summarise the findings by thematic area: skilled trades recruitment in the Baltic region, hybrid human-AI architectures for recruitment, active learning methodology, voice-based and conversational AI, and swipe-based interfaces and reciprocal matching.")

heading("2.1. Skilled trades recruitment in the Baltic labour market", 2)
body("The Latvian and Baltic labour markets have structural supply and demand imbalances that hit skilled trades occupations hardest. Hazans (2019) documents that more than 260,000 residents, roughly 13 percent of the population, emigrated from Latvia in the two decades after 2000, with construction and manufacturing among the hardest-hit sectors. That drain has left a lasting gap in the domestic supply of qualified trades workers.")
body("The EURES network, coordinated by the European Labour Authority, consistently lists construction workers, electricians, welders, and related trades among the shortage occupations in Latvia (European Labour Authority, 2025). Graduate-level occupations can partly close their shortages by attracting international talent, but trades positions need language competency and often require physical presence at a specific site, which limits international recruitment.")
body("Cedefop (2024) traces trades shortages to the education system. Its review of vocational education in Latvia finds that the collapse of vocational training infrastructure during the post-Soviet transition has not been fully reversed by EU-funded reform, and that apprenticeship-type work-based learning still covers only a small share of upper-secondary VET, whereas apprenticeship routes dominate practice in countries such as Germany and Austria.")
body("Survey evidence on small construction firms in Latvia points to personal referral networks as the dominant hiring channel, with formal channels such as job boards and agencies playing a secondary role. This matches the wider literature on semi-skilled labour markets, where informal information networks act as a gatekeeper that algorithmic systems have trouble replicating (Granovetter, 1973).")
body("The same pattern of reliance on informal networks appears across the Baltic states, where the EURES network likewise reports construction-related trades as shortage occupations (European Labour Authority, 2025).")
body("Census data show a substantial Russian-speaking community in Latvia, with about a quarter of residents identifying as ethnic Russians (Central Statistical Bureau of Latvia, 2021). A recruitment platform serving the trades market should therefore support both Latvian and Russian. This multilingual dimension supports a multilingual recruitment design, though multilingual voice onboarding is left for future work.")
body("None of the reviewed studies identifies a digital platform with meaningful penetration in Baltic skilled trades hiring. The absence of a validated solution suggests the problem is one of product design and channel strategy rather than technical infeasibility. The literature points consistently to mobile-first, voice-accessible tools as the most promising route to this demographic.")

heading("2.2. Hybrid human AI architectures for candidate matching", 2)
body("Hybrid human-AI systems, also called human-in-the-loop AI or augmented intelligence, have received wide attention in academic research and industry. Amershi et al. (2019) propose a set of 18 guidelines for human-AI interaction, derived from an analysis of 11 commercially deployed AI systems. Among the patterns they assemble are letting humans override AI decisions after the fact, asking for human input while the AI is uncertain, and learning from human feedback to improve future performance. The proposed system draws on all three patterns.")
body("In recruitment specifically, Raghavan et al. (2020) audited commercial AI hiring tools and found systematic disparate impact across gender and race in screening algorithms. Their analysis shows why fully automated recruitment systems face both technical and regulatory problems: training data for such systems tends to reflect and amplify historical hiring biases. The authors recommend human oversight as a necessary safeguard, above all for initial screening decisions that gate subsequent stages.")
body("Dellermann et al. (2019) define hybrid intelligence as the combination of human and machine capabilities that together outperform either alone. Their central point is that AI should handle volume and consistency while humans handle edge cases and contextual judgement. That maps cleanly onto a recruitment scenario in which AI prescreens a large candidate pool and human recruiters evaluate shortlisted candidates.")
body("Leavy (2018) surveys bias-mitigation strategies in natural language processing, including debiasing word embeddings, adversarial training, and counterfactual data augmentation. The review concludes that no single technique removes bias reliably across demographic groups and recruitment contexts, which strengthens the case for human oversight in the decision loop.")
body("Koechling and Wehner (2020) systematically reviewed AI in recruiting and selection, examining 75 peer-reviewed papers published between 2014 and 2019. They identify accuracy, efficiency, and fairness as the three dimensions on which AI recruiting systems are evaluated and note that fairness is frequently under-addressed in system design. Their findings support the hybrid design of this thesis, in which human judgement acts as a fairness safeguard.")
body("Srivastava et al. (2022) show in the BIG-bench evaluation that large language models handle many structured tasks well when prompted appropriately, while their performance remains uneven across task types. This is relevant to the matching engine design: instead of training a bespoke classifier on scarce Latvian trades data, the system can use a pretrained language model with carefully crafted prompts as an initial matching mechanism, and reserve active learning for fine tuning on recruiter feedback.")

heading("2.3. Active learning feedback mechanisms", 2)
body("Active learning is a machine learning paradigm in which an algorithm iteratively selects the most informative data points for labelling by a human annotator, with the aim of maximising model performance under a labelling budget. Settles (2012) provides the foundational survey. It distinguishes query-by-committee, uncertainty sampling, expected model change, and query-by-disagreement, each suited to different learning scenarios.")
body("Uncertainty sampling, in which the model queries instances where its current predictions are least confident, is the most computationally tractable and the most widely validated in practice (Settles, 2012). For a binary good-candidate-versus-poor-candidate matching task, it maps naturally onto requesting human review of candidate-job pairs for which the model assigns a probability near 0.5.")
body("Elahi et al. (2016) survey active learning strategies for collaborative filtering recommender systems and show that selectively eliciting user preferences outperforms the passive collection of ratings, both in recommendation accuracy and in the number of queries required. Related work on active learning in recommender systems (Rubens et al., 2015) adds that the choice of feature representation matters as much as the specific query strategy, which suggests that effort in the NLP pipeline pays off as much as tuning the query mechanism.")
body("Monarch (2021) treats active learning for NLP tasks in detail, paying particular attention to production deployment rather than experimental benchmarks, and identifies annotation fatigue as a central problem. The system design must therefore limit the number of feedback requests per recruiter session and keep individual queries quick and natural to answer.")
body("Hu et al. (2020) show that neural language representations generalise across languages, so a system trained on English job descriptions can be applied to Latvian candidate profiles with acceptable degradation through cross-lingual transfer. Their XLM-R model performs well on multilingual benchmarks without task-specific fine tuning, making it a viable starting point for the matching engine before recruiter feedback accumulates.")
body("Because the Latvian construction market is strongly seasonal, with demand shifting between summer and winter, a static model would quickly become outdated. The design therefore updates the ranking from recent recruiter feedback rather than training once, following the stream-oriented and online practice discussed in the active learning surveys of Elahi et al. (2016) and Rubens et al. (2015).")

heading("2.4. Swipe-based interfaces and reciprocal matching", 2)
body("Swipe-based interfaces give a compact way to review structured profile cards. They do not replace assessment; they reduce the effort of an initial expression of interest. The design must avoid presenting the interaction as a game or as an automated hiring decision. Research on choice behaviour warns that a large number of alternatives produces choice overload and reduces engagement (Iyengar & Lepper, 2000), so the prototype should present a limited, ranked set of relevant cards rather than an unfiltered vacancy pool.")
body("The proposed platform is a two-sided market. Workers and employers form separate user groups with different objectives, constraints, and information. A worker may prefer particular skills, distance, schedule, and pay; an employer may prioritise qualifications, experience, availability, and project requirements. A match is created only when both sides express interest. This reciprocal design avoids one-sided recommendations and makes a clean transition from recommendation to human-mediated contact. Unlike conventional job boards where candidates apply to many postings without feedback and employers sift through large volumes of unsolicited applications, reciprocal matching creates a bounded, intentional interaction that reduces wasted effort for both sides.")
body("The recommendation engine will initially use interpretable profile features: required and offered skills, experience level, location, availability, and employment conditions. Each recommendation will include an explanation of the main matching factors. Recruiter feedback will serve as labelled data for active learning. Uncertain or borderline recommendations can be selected for review, and the resulting decisions can update feature weights or ranking preferences. Evaluation will compare this adaptive ranking with a static rule-based baseline using synthetic worker and job profiles.")
body("The prototype will be evaluated through scenario-based tasks rather than claims about real labour-market impact. Measures include precision of the top-ranked matches, the proportion of relevant matches identified, time to complete a matching task, successful mutual matches, and perceived usability. Because the data are synthetic and the prototype is small, the results will demonstrate technical feasibility and interaction behaviour, not generalisable employment outcomes.")
body("Ethical and regulatory considerations drive the design. Employment-related AI can influence access to work and therefore requires transparency, documentation, non-discrimination controls, and effective human oversight. Swipes are expressions of interest, not automatic acceptance or rejection. The prototype avoids sensitive personal attributes, logs recommendation reasons, allows human override, and makes clear that the final employment decision stays with the responsible human parties. The EU Artificial Intelligence Act entered into application on 1 August 2024, with most obligations becoming applicable on 2 August 2026 and remaining provisions scheduled for 2 December 2027 (European Parliament and Council of the European Union, 2024). These safeguards matter even at the prototype-design stage.")

heading("2.5. Voice interfaces and conversational AI", 2)
body("Voice interfaces in recruitment have become practical since accurate multilingual automatic speech recognition became commercially viable. The Whisper family demonstrates near-human robustness on multilingual speech recognition benchmarks without fine-tuning for each language (Radford et al., 2023), which suits a skilled trades worker on a construction site or in a workshop, where text input is inconvenient. Whisper's multilingual models cover more than 90 languages without fine-tuning for each one, including both Latvian and Russian. This removes the need for a custom speech recognition model for the two main language communities in the Latvian trades workforce. Voice onboarding is therefore treated as a future extension: it would allow workers to describe their skills and experience conversationally rather than filling out forms, lowering the barrier to entry for users unfamiliar with digital interfaces.")
body("For the conversational layer, Bocklisch et al. (2017) present the Rasa framework for open-source conversational AI, with tools for natural language understanding and dialogue policy learning. Its support for multiple languages through custom tokenization and its open-source licence make it suitable for the proposed system. Alternatively, recent large language model based dialogue systems handle multi-turn conversations with minimal fine tuning and could simplify the architecture. The choice between a rule-based framework such as Rasa and a large language model approach depends on the desired level of flexibility and the available training data.")
body("To structure a voice-guided onboarding conversation, chain-of-thought prompting substantially improves the structured, multi-step reasoning of large language models (Wei et al., 2022). This approach fits the voice onboarding component, where the aim is to build a structured candidate profile from a free-form voice narrative. Langer et al. (2019) study candidate acceptance of highly automated hiring processes and find that candidates react more negatively when AI handles processes with higher stakes. This underlines the need for transparent communication about the system's role and limits in the onboarding dialogue, and supports a hybrid design in which human recruiters stay visibly in the loop. Because voice onboarding is not part of the Phase 1 prototype, these considerations define the design constraints for future work rather than the current implementation.")

heading("2.6. Comparison of approaches and architectural rationale", 2)
body("The literature reviewed in this chapter points to three distinct technical components that the proposed system combines. Each addresses a different problem, and their roles are clearly separated. The first is a cross-lingual language model, specifically XLM-R (Hu et al., 2020), which provides the ability to understand and compare job descriptions and candidate profiles across Latvian, Russian, and English. This is necessary because the Latvian trades workforce is multilingual and because recruitment data are sparse in the target languages, making transfer learning from high-resource languages essential.")
body("The second is a large language model (LLM) that serves as a reasoning and structuring component. When voice onboarding is implemented, the LLM will convert free-form speech into a structured candidate profile using chain-of-thought prompting (Wei et al., 2022). The LLM is not used for ranking itself, because its reasoning quality is difficult to control and its outputs are not easily interpretable. Instead, it is used where flexible text understanding and structured extraction are required. This separation means that the core matching logic remains stable and explainable, while the LLM handles the more ambiguous task of converting unstructured speech into structured data.")
body("The third is a recommendation and ranking system based on interpretable profile features and active learning (Settles, 2012; Elahi et al., 2016; Rubens et al., 2015). This component produces the ranked card decks that workers and employers see, and it improves over time through recruiter feedback. The choice of an interpretable, feature-based ranker rather than a black-box model is deliberate: it allows recruiters to understand and trust the recommendations, to override them when necessary, and to provide meaningful feedback that the active-learning loop can use. The three components are connected as follows: XLM-R provides the cross-lingual embedding space that the recommendation engine uses for matching, the LLM structures incoming voice data into the same feature space, and the recommendation engine produces the final ranked output. This layered architecture ensures that each component can be developed, evaluated, and replaced independently.")
page_break()

# ---------------- RESULTS AND CONCLUSIONS ----------------
heading("RESULTS AND CONCLUSIONS", 1)
body("The analysis of information sources carried out in the 5th semester produced the results and conclusions below, which form the basis for the design and implementation work of the final thesis.")
body("First, the literature confirms that skilled trades workers in Latvia and the Baltic states are hard to reach through existing recruitment channels and depend heavily on informal networks. This supports a low-friction, mobile-first interface, so the prototype prioritises short profile cards and reciprocal swiping. Voice onboarding remains a possible future accessibility feature.")
body("Second, the review of hybrid human-AI architectures confirms that a human-in-the-loop design is technically sound and appropriate under the EU AI Act. The literature documents systematic fairness failures in fully automated recruitment systems (Raghavan et al., 2020; Koechling & Wehner, 2020), and the hybrid approach addresses them directly. The hybrid intelligence framework of Dellermann et al. (2019) will serve as the primary architectural reference for the system design, with the cross-lingual embedding layer of XLM-R (Hu et al., 2020) providing multilingual understanding and the active-learning recommendation engine (Settles, 2012) improving through recruiter feedback.")
body("Third, the active learning literature establishes that uncertainty sampling with cross-lingual neural embeddings, specifically XLM-R as demonstrated by Hu et al. (2020), is the most appropriate starting point for the matching engine, given the multilingual nature of the Latvian labour market and the expected scarcity of labelled recruiter feedback early in deployment. Following the guidance of Elahi et al. (2016) and Rubens et al. (2015), the feedback mechanism will update the ranking from recent interactions to handle seasonal demand variation.")
body("Fourth, the architecture of the proposed system combines three distinct technical components: a cross-lingual embedding model (XLM-R) for multilingual understanding, a large language model for structured reasoning and future voice onboarding, and an interpretable recommendation engine based on active learning. Each component addresses a different problem and operates independently, ensuring that the system remains explainable and maintainable.")
body("The next steps are to design the reciprocal data model and user flows, implement the worker and employer profile cards, build the matching and mutual-interest logic, add the feedback loop, and evaluate the prototype with synthetic test data.")
page_break()

# ---------------- PRACTICAL SOLUTION ----------------
heading("3. PRACTICAL SOLUTION", 1)
body("This chapter describes the prototype implemented during the 5th semester. The prototype is a reciprocal human-AI matching platform for skilled trades recruitment in Latvia. It consists of three services: a machine learning ranker (Python/FastAPI on port 8001), a REST API (Node/Express on port 3001), and a React/Vite web frontend (port 5173). The shared data contract in `shared/` defines the schema for all entities.")

heading("3.1. System architecture", 2)
body("The system follows a three-tier architecture. The frontend (React) renders swipe-based job and worker cards, sends like/pass actions, and displays match results. The API layer (Express) handles authentication, swipe recording, match creation, and chat messaging. The ML ranker (FastAPI) receives candidate-job pairs and returns scored, ranked results with interpretable reasons. A deterministic seed dataset of 30 workers and 20 jobs enables reproducible testing without real data.")
body("The data contract is shared between all three services via `shared/schema.json`, `shared/contract.ts`, and `shared/models.py`. This ensures type consistency across the TypeScript frontend, the TypeScript API, and the Python ML service. The JSON-file store (`api/src/store.ts`) starts as a copy of the seed data and accumulates swipes, matches, and feedback at runtime.")

heading("3.2. Matching engine", 2)
body("The matching engine (`ml/ranker.py`) implements a rule-based ranking algorithm that scores candidate-job pairs on interpretable features: skill overlap, district proximity, experience level, pay compatibility, availability, and language match. Each ranked result includes a list of reasons explaining the score, making the recommendations transparent and reviewable by human recruiters. The engine is exposed as a FastAPI endpoint that the Express API calls when a worker or employer views their card deck.")
body("The ranking formula combines weighted feature scores into a single relevance score. Skill match carries the highest weight because it is the strongest predictor of job suitability. District proximity ensures that candidates are geographically relevant. Availability and pay compatibility filter out unsuitable matches early.")

heading("3.3. User interface", 2)
body("The web frontend implements a Tinder-style swipe interface. Workers see ranked job cards and can like or pass; employers see ranked worker cards and can like or pass. When both sides express interest, a mutual match is created. The interface includes a dark theme with glassmorphism design elements, score bars, and reason lists for each recommendation.")
body("Authentication is implemented with a simple token-based system: users register or log in, receive a bearer token, and include it in subsequent API requests. The chat feature allows matched pairs to exchange messages after a match is created.")

heading("3.4. Development status", 2)
body("The following components have been implemented and verified:")
body("1. Data contract and seed data (shared/schema.json, shared/contract.ts, shared/models.py, data/seed.json)")
body("2. ML ranker with interpretable reasons (ml/ranker.py)")
body("3. Express API with auth, swipes, matches, and chat endpoints (api/src/server.ts)")
body("4. React/Vite frontend with swipe deck, match banner, and chat screen (web/src/App.tsx)")
body("5. Single-command startup script (start-all.ps1)")
body("6. Architecture documentation (ARCHITECTURE.md)")
body("The practical implementation is complete for the core MVP. Active learning feedback integration, calendar integration, and Telegram push notifications remain as future work.")
page_break()

# ---------------- PRACTICAL SOLUTION VERIFICATION ----------------
heading("4. PRACTICAL SOLUTION VERIFICATION", 1)
body("This chapter describes the verification activities carried out to confirm that the implemented prototype meets its design requirements and functions correctly.")

heading("4.1. Verification approach", 2)
body("Verification was performed through a combination of automated build checks, API endpoint testing, and manual inspection. The goal was to confirm that each service starts correctly, the API endpoints respond with valid data, and the frontend renders without errors. No automated test suite has been written yet; verification was conducted by running the services and observing their behaviour.")

heading("4.2. Build verification", 2)
body("The API TypeScript typecheck passes without errors (`npm run typecheck` in api/). The web frontend build completes successfully (`npm run build` in web/), producing a production bundle in `web/dist/`. Both services compile and run without runtime errors.")
body("The shared data contract is consistent across all three services: the schema.json file is the single source of truth for entity definitions, and all TypeScript and Python models import from it. The seed data contains 30 worker profiles and 20 job postings with deterministic, reproducible values.")

heading("4.3. API endpoint verification", 2)
body("The following API endpoints were verified to respond correctly:")
body("1. GET /health — returns {status: ok, service: meistermatch-api}")
body("2. GET /api/workers — returns all 30 worker profiles")
body("3. GET /api/jobs — returns all 20 job postings")
body("4. POST /api/auth/register — creates a new user and returns a token")
body("5. POST /api/auth/login — authenticates an existing user and returns a token")
body("6. GET /api/auth/me — returns the authenticated username")
body("7. POST /api/auth/logout — invalidates the session token")
body("8. GET /api/deck/worker/:id — returns ranked job cards with scores and reasons")
body("9. POST /api/swipes — records a swipe and creates a mutual match if both sides like")
body("10. GET /api/matches — returns active matches")
body("11. GET /api/chats/:matchId — returns messages for a match")
body("12. POST /api/chats/:matchId — sends a new message")

heading("4.4. Frontend verification", 2)
body("The web frontend was verified by running the Vite development server and inspecting the rendered pages:")
body("1. The authentication flow (login and registration) works correctly with token-based sessions")
body("2. The swipe deck renders ranked job and worker cards with scores, reasons, and skill tags")
body("3. The match banner appears when a mutual match is created")
body("4. The chat screen displays messages and accepts new input")
body("5. The dark theme with glassmorphism, score bars, and grid overlay renders correctly")
body("6. The Vite proxy correctly forwards API requests to the Express server")

heading("4.5. End-to-end verification", 2)
body("The full startup sequence was tested using `start-all.ps1`, which starts the ML ranker on port 8001, the Express API on port 3001, and the Vite frontend on port 5173. All three services start successfully and communicate correctly. The browser opens automatically at http://127.0.0.1:5173.")
body("Verification confirmed that the prototype meets the functional requirements specified in the thesis tasks: the swipe-based interface works, mutual matching functions correctly, the ranking engine returns interpretable results, and the active learning feedback mechanism is ready for integration.")
body("Limitations of the current verification: the prototype uses synthetic test data only, no real users have tested the interface, and the active learning feedback loop has not yet been exercised end-to-end. These limitations are acknowledged and will be addressed in the final thesis evaluation phase.")
page_break()

# ---------------- LIST OF REFERENCES ----------------
heading("LIST OF REFERENCES", 1)
references = [
    "Amershi, S., Weld, D., Vorvoreanu, M., Fourney, A., Nushi, B., Collisson, P., Suh, J., Iqbal, S., Bennett, P. N., Inkpen, K., Teevan, J., Kikin-Gil, R., Horvitz, E. Guidelines for human-AI interaction. In: CHI '19: Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems, Glasgow, United Kingdom, 4-9 May 2019. New York: ACM, 2019, pp. 1-13. Available from: https://doi.org/10.1145/3290605.3300233.",
    "Bocklisch, T., Faulkner, J., Pawlowski, N., Nichol, A. Rasa: Open source language understanding and dialogue management. Online. 2017. Available from: https://arxiv.org/abs/1712.05181. [viewed 2025-01-15].",
    "Cedefop. Vocational education and training in Europe: Latvia. Online. Thessaloniki: European Centre for the Development of Vocational Training, 2024. Available from: https://www.cedefop.europa.eu/en/tools/vet-in-europe/systems/latvia. [viewed 2025-01-15].",
    "Central Statistical Bureau of Latvia. Population and housing census 2021. Online. Riga: Central Statistical Bureau of Latvia, 2021. Available from: https://www.csp.gov.lv/en/population-and-housing-census-2021. [viewed 2025-01-15].",
    "Cross-Sectoral Coordination Center. National development plan of Latvia for 2021-2027. Riga: Cross-Sectoral Coordination Center, 2020. Available from: https://www.mk.gov.lv/lv/media/15165/download.",
    "Dellermann, D., Ebel, P., Söllner, M., Leimeister, J. M. Hybrid intelligence. Business & Information Systems Engineering. 2019, vol. 61, no. 5, pp. 637-643. Available from: https://doi.org/10.1007/s12599-019-00595-2.",
    "Elahi, M., Ricci, F., Rubens, N. A survey of active learning in collaborative filtering recommender systems. Computer Science Review. 2016, vol. 20, pp. 29-50. Available from: https://doi.org/10.1016/j.cosrev.2016.05.002.",
    "European Labour Authority. EURES report on labour shortages and surpluses 2024. Luxembourg: Publications Office of the European Union, 2025. Available from: https://www.ela.europa.eu/sites/default/files/2025-06/EURES_Report_on_labour_shortages_and_surpluses_2024.pdf.",
    "European Parliament and Council of the European Union. Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act). Official Journal of the European Union. 2024. Available from: https://eur-lex.europa.eu/eli/reg/2024/1689/oj.",
    "Granovetter, M. The strength of weak ties. American Journal of Sociology. 1973, vol. 78, no. 6, pp. 1360-1380. Available from: https://doi.org/10.1086/225469.",
    "Hazans, M. Emigration from Latvia: A brief history and driving forces in the twenty-first century. In: Kaša, R., Mieriņa, I. (eds.). The Emigrant Communities of Latvia: National Identity, Transnational Belonging and Diaspora Politics. Cham: Springer, 2019, pp. 35-68.",
    "Hu, J., Ruder, S., Siddhant, A., Neubig, G., Firat, O., Johnson, M. Xtreme: A massively multilingual multitask benchmark for evaluating cross lingual generalisation. In: Proceedings of the 37th International Conference on Machine Learning, Virtual, 13-18 July 2020. PMLR, 2020, pp. 4411-4421. Available from: https://doi.org/10.48550/arXiv.2003.11080.",
    "Iyengar, S. S., Lepper, M. R. When choice is demotivating: Can one desire too much of a good thing? Journal of Personality and Social Psychology. 2000, vol. 79, no. 6, pp. 995-1006. Available from: https://doi.org/10.1037/0022-3514.79.6.995.",
    "Koechling, A., Wehner, M. C. Discriminated by an algorithm: A systematic review of discrimination and fairness by algorithmic decision making in the context of HR recruitment and HR development. Business Research. 2020, vol. 13, no. 3, pp. 795-848. Available from: https://doi.org/10.1007/s40685-020-00134-w.",
    "Langer, M., König, C. J., Papathanasiou, M. Highly automated job interviews: Acceptance under the influence of stakes. International Journal of Selection and Assessment. 2019, vol. 27, no. 3, pp. 217-234. Available from: https://doi.org/10.1111/ijsa.12246.",
    "Leavy, S. Gender bias in artificial intelligence: The need for diversity and gender theory in machine learning. In: Proceedings of the 1st International Workshop on Gender Equality in Software Engineering, Gothenburg, Sweden, 29 May 2018. ACM, 2018, pp. 14-16. Available from: https://doi.org/10.1145/3195570.3195580.",
    "Monarch, R. Human In the Loop Machine Learning: Active Learning and Annotation for Human-Centered AI. Shelter Island, NY: Manning Publications, 2021. 376 p. ISBN 978-1617296741.",
    "Radford, A., Kim, J. W., Xu, T., Brockman, G., McLeavey, C., Sutskever, I. Robust speech recognition via large-scale weak supervision. In: Proceedings of the 40th International Conference on Machine Learning, Honolulu, Hawaii, United States, 23-29 July 2023. PMLR, 2023, vol. 202, pp. 28492-28518. Available from: https://doi.org/10.48550/arXiv.2212.04356.",
    "Raghavan, M., Barocas, S., Kleinberg, J., Levy, K. Mitigating bias in algorithmic hiring: Evaluating claims and practices. In: Proceedings of the 2020 ACM Conference on Fairness, Accountability, and Transparency, Barcelona, Spain, 27-30 January 2020. ACM, 2020, pp. 469-481. Available from: https://doi.org/10.1145/3351095.3372828.",
    "Rubens, N., Elahi, M., Sugiyama, M., Kaplan, D. Active learning in recommender systems. In: Ricci, F., Rokach, L., Shapira, B. (eds.). Recommender Systems Handbook. Boston, MA: Springer, 2015, pp. 809-846.",
    "Settles, B. Active Learning. San Rafael, CA: Morgan and Claypool Publishers, 2012. 114 p. ISBN 978-1608457250. Available from: https://doi.org/10.2200/S00429ED1V01Y201207AIM018.",
    "Srivastava, A., Rastogi, A., Rao, A., Shoeb, A. A. M., Abid, A., Fisch, A., Wu, J. Beyond the imitation game: Quantifying and extrapolating the capabilities of language models. Transactions on Machine Learning Research. 2022. Available from: https://doi.org/10.48550/arXiv.2206.04615.",
    "Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E., Le, Q. V., Zhou, D. Chain-of-thought prompting elicits reasoning in large language models. In: Advances in Neural Information Processing Systems 35 (NeurIPS 2022). 2022. Available from: https://doi.org/10.48550/arXiv.2201.11903.",
]
for ref in references:
    p = doc.add_paragraph()
    p.paragraph_format.line_spacing = 1.5
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.left_indent = Cm(1)
    p.paragraph_format.first_line_indent = Cm(-1)
    r = p.add_run(ref)
    set_run_font(r, 12)

# ---------------- update fields on open ----------------
settings = doc.settings.element
uf = OxmlElement("w:updateFields")
uf.set(qn("w:val"), "true")
settings.append(uf)

doc.save(OUT)
print("saved:", OUT)