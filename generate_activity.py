import json
import re
from collections import Counter
from pathlib import Path

JOURNAL_PATH = Path("./content/journal")
PROFILS_PATH = Path("./content/Profil")
BADGES_PATH = Path("./content/Badges")
OUTPUT = Path("./quartz/static/activity.json")

# Fichier committé listant les périodes de CTF (début/fin) utilisées par la
# heatmap pour afficher un losange sur les jours concernés.
CTF_PERIODS_PATH = Path("./ctf_periods.json")


def load_ctf_periods() -> list[dict]:
    if not CTF_PERIODS_PATH.exists():
        return []

    with CTF_PERIODS_PATH.open(encoding="utf-8") as f:
        periods = json.load(f)

    valid = []
    for period in periods:
        start, end = period.get("start"), period.get("end")
        if not start or not end or not re.match(r"\d{4}-\d{2}-\d{2}$", start) or not re.match(r"\d{4}-\d{2}-\d{2}$", end):
            print(f"⚠ Période CTF ignorée (dates invalides ou TODO) : {period.get('name', '?')}")
            continue
        valid.append({"name": period.get("name", ""), "start": start, "end": end})

    return valid

IMAGE_EXTS = {".jpg", ".jpeg", ".png"}

data = {}
totaux = Counter({"resolve": 0, "retex": 0, "autre": 0})


def classify_activity(activity: str) -> str:
    a = activity.strip().lower()
    if a.startswith("resolve"):
        return "resolve"
    if a.startswith("retex"):
        return "retex"
    return "autre"


def count_images(directory: Path, recursive: bool = False) -> int:
    if not directory.exists() or not directory.is_dir():
        return 0

    iterator = directory.rglob("*") if recursive else directory.iterdir()
    return sum(
        1
        for path in iterator
        if path.is_file() and path.suffix.lower() in IMAGE_EXTS
    )


for file_path in JOURNAL_PATH.iterdir():
    if file_path.suffix.lower() != ".md":
        continue

    date = file_path.stem
    if not re.match(r"\d{4}-\d{2}-\d{2}$", date):
        continue

    content = file_path.read_text(encoding="utf-8")

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
        },
    }

profil_count = count_images(PROFILS_PATH)
badge_count = count_images(BADGES_PATH)

data["__totaux__"] = {
    "resolve": totaux["resolve"],
    "retex": totaux["retex"],
    "autre": totaux["autre"],
}

data["__assets__"] = {
    "profils": profil_count,
    "badges": badge_count,
}

ctf_periods = load_ctf_periods()
data["__ctf_periods__"] = ctf_periods

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
with OUTPUT.open("w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✓ {len([k for k in data.keys() if not k.startswith('__')])} jours générés")
print(
    f"✓ Totaux — Resolve: {totaux['resolve']}, "
    f"RETEX: {totaux['retex']}, "
    f"Autre: {totaux['autre']}"
)
print(
    f"✓ Assets — Profils: {profil_count}, "
    f"Badges: {badge_count}"
)
print(f"✓ Périodes CTF — {len(ctf_periods)} période(s) chargée(s)")