import os
import json
import re
from collections import Counter

JOURNAL_PATH = "./content/journal"
OUTPUT = "./quartz/static/activity.json"

data = {}
totaux = Counter({"resolve": 0, "retex": 0, "autre": 0})

def classify_activity(activity: str) -> str:
    a = activity.strip().lower()
    if a.startswith("resolve"):
        return "resolve"
    if a.startswith("retex"):
        return "retex"
    return "autre"

for f in os.listdir(JOURNAL_PATH):
    if not f.endswith(".md"):
        continue

    date = f.replace(".md", "")
    if not re.match(r"\d{4}-\d{2}-\d{2}$", date):
        continue

    with open(os.path.join(JOURNAL_PATH, f), encoding="utf-8") as fh:
        content = fh.read()

    match = re.search(r"## Activités\n(.*?)(?=\n##|\Z)", content, re.DOTALL)
    if not match:
        continue

    activites = re.findall(r"^- (.+)$", match.group(1), re.MULTILINE)
    if not activites:
        continue

    stats = Counter({"resolve": 0, "retex": 0, "autre": 0})
    for activite in activites:
        cat = classify_activity(activite)
        stats[cat] += 1
        totaux[cat] += 1

    data[date] = {
        "count": len(activites),
        "activités": activites,
        "stats": {
            "resolve": stats["resolve"],
            "retex": stats["retex"],
            "autre": stats["autre"],
        }
    }

data["__totaux__"] = {
    "resolve": totaux["resolve"],
    "retex": totaux["retex"],
    "autre": totaux["autre"],
}

with open(OUTPUT, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✓ {len(data) - 1} jours générés")
print(
    f"✓ Totaux — Resolve: {totaux['resolve']}, "
    f"RETEX: {totaux['retex']}, "
    f"Autre: {totaux['autre']}"
)