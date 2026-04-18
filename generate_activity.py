import os, json, re

JOURNAL_PATH = "./content/journal"
OUTPUT = "./quartz/static/activity.json"

data = {}

for f in os.listdir(JOURNAL_PATH):
    if not f.endswith(".md"):
        continue

    # Le nom du fichier est la date
    date = f.replace(".md", "")
    if not re.match(r"\d{4}-\d{2}-\d{2}", date):
        continue

    with open(os.path.join(JOURNAL_PATH, f), encoding="utf-8") as fh:
        content = fh.read()

    # Extraire le bloc ## Activités
    match = re.search(r"## Activités\n(.*?)(?=\n##|\Z)", content, re.DOTALL)
    if not match:
        continue

    activités = re.findall(r"^- (.+)$", match.group(1), re.MULTILINE)
    if not activités:
        continue

    data[date] = {
        "count": len(activités),
        "activités": activités
    }

with open(OUTPUT, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✓ {len(data)} jours générés")