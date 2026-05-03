const init = async () => {
    const root = document.getElementById("heatmap-root");
    if (!root) return;

    const base = document.querySelector('meta[name="base-url"]')?.content || "/Notes";
    const res = await fetch(`${base}/static/activity.json`);
    if (!res.ok) {
        console.error("Impossible de charger activity.json :", res.status);
        return;
    }
    const data = await res.json();

    const formatLocalDate = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    };

    const today = new Date();
    const todayStr = formatLocalDate(today);
    const year = today.getFullYear();

    const start = new Date(year, 0, 1);
    const days = [];
    const cursor = new Date(start);

    while (formatLocalDate(cursor) <= todayStr) {
        days.push(formatLocalDate(cursor));
        cursor.setDate(cursor.getDate() + 1);
    }

    const color = (count) => {
        if (!count) return "var(--hm-empty)";
        if (count === 1) return "#fdca98";
        if (count === 2) return "#fda460";
        if (count === 3) return "#fd8235";
        if (count === 4) return "#e24b0f";
        return "#9c2f07";
    };

    const MOIS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
    const JOURS = ["L", "M", "Me", "J", "V", "S", "D"];
    const JOURS_A_AFFICHER = new Set([1, 3, 5]);

    const CELL = 13;
    const GAP = 3;
    const LABEL_W = 24;
    const step = CELL + GAP;

    const dayOfWeek = (dateStr) => {
        const d = new Date(dateStr + "T12:00:00");
        return (d.getDay() + 6) % 7;
    };

    const firstDow = dayOfWeek(days[0]);

    let monthOffset = 0;
    let prevMonth = null;

    const dayInfo = days.map((date, i) => {
        const pos = i + firstDow;
        const baseCol = Math.floor(pos / 7);
        const row = pos % 7;

        const [y, m, d] = date.split("-").map(Number);
        const month = m - 1;

        if (prevMonth !== null && month !== prevMonth && d === 1) {
            monthOffset += 1;
        }

        const col = baseCol + monthOffset;
        prevMonth = month;

        return { date, col, row, month };
    });

    const colToPx = (c) => c * step;

    const monthBounds = {};
    dayInfo.forEach(({ month, col }) => {
        if (!(month in monthBounds)) {
            monthBounds[month] = { min: col, max: col };
        } else {
            monthBounds[month].min = Math.min(monthBounds[month].min, col);
            monthBounds[month].max = Math.max(monthBounds[month].max, col);
        }
    });

    const maxCol = Math.max(...dayInfo.map(d => d.col));
    const totalWidth = LABEL_W + colToPx(maxCol) + CELL + 10;
    const gridH = 7 * step;

    const monthHeader = MOIS.map((label, idx) => {
        if (!(idx in monthBounds)) return "";

        const { min, max } = monthBounds[idx];
        const startX = LABEL_W + colToPx(min);
        const endX = LABEL_W + colToPx(max) + CELL;
        const centerX = (startX + endX) / 2;

        return `<div style="position:absolute;left:${centerX}px;transform:translateX(-50%);font-size:10px;color:var(--hm-muted);white-space:nowrap;pointer-events:none">${label}</div>`;
    }).join("");

    const cells = dayInfo.map(({ date, col, row }) => {
        const d = data[date];
        const count = d?.count || 0;
        const cx = LABEL_W + colToPx(col);
        const cy = row * step;

        return `<div class="hm-day"
            style="position:absolute;left:${cx}px;top:${cy}px;background:${color(count)}"
            data-date="${date}"
            data-count="${count}"
            title="${date} — ${count} activité(s)"
        ></div>`;
    }).join("");

    const dayLabels = JOURS.map((label, i) => {
        if (!JOURS_A_AFFICHER.has(i)) return "";
        const y = i * step + 2;
        return `<div style="position:absolute;top:${y}px;left:0;width:${LABEL_W - 4}px;font-size:10px;color:var(--hm-muted);text-align:right">${label}</div>`;
    }).join("");

    const colorize = (text) => {
        const keywords = {
            "Resolve": "#c49a6c",
            "Retex": "#fd8235",
            "Created": "#9FE1CB",
        };

        const dashIdx = text.indexOf(" — ");
        if (dashIdx === -1) return `>${text}</li>`;

        const keyword = text.slice(0, dashIdx);
        const rest = text.slice(dashIdx + 3);
        const color = keywords[keyword];

        if (!color) return `>${text}</li>`;

        const parts = rest.split(" · ");
        const name = parts[0];
        const context = parts.slice(1).join(" · ");

        return `>
            <span style="color:${color};font-weight:500">${keyword}</span>
            <span style="color:${color};font-weight:300"> — </span>
            <span style="font-weight:500">${name}</span>
            ${context ? `<span style="color:var(--hm-muted);font-size:.9em"> · ${context}</span>` : ""}
        </li>`;
    };

    const totals = data.__totaux__ || { resolve: 0, retex: 0, autre: 0 };

    root.innerHTML = `
    <style>
      @media (prefers-color-scheme: light) {
        #heatmap-root {
          --hm-empty: #b3b3b5;
          --hm-border: #b8b8b8;
          --hm-text: #a0522d;
          --hm-muted: #4e4e4e;
          --hm-active: #a0522d;
        }
      }
      @media (prefers-color-scheme: dark) {
        #heatmap-root {
          --hm-empty: #5c5b5b;
          --hm-border: #646464;
          --hm-text: #ebebec;
          --hm-muted: #5c5b5b;
          --hm-active: #c4845a;
        }
      }
      #heatmap-root { font-family: inherit; }
      .hm-day {
        width: ${CELL}px; height: ${CELL}px; border-radius: 3px;
        cursor: pointer; transition: transform .1s;
        outline: 2px solid transparent;
      }
      .hm-day:hover { transform: scale(1.4); }
      .hm-day.active { outline-color: var(--hm-active); outline-offset: 1px; }
      .hm-detail {
        padding: 1rem 1.2rem;
        border: 1px solid var(--hm-border);
        border-radius: 8px;
        min-height: 64px;
        color: var(--hm-text);
        margin-top: 1.5rem;
      }
      .hm-summary {
        padding: 1rem 1.2rem;
        border: 1px solid var(--hm-border);
        border-radius: 8px;
        min-height: 64px;
        color: var(--hm-text);
        margin-top: 1rem;
      }
      .hm-detail em { color: var(--hm-muted); }
      .hm-detail ul { margin: .6rem 0 0; padding-left: 1.2rem; }
      .hm-detail li { margin: .3rem 0; }
      .hm-date { color: var(--hm-muted);  font-weight: 500; font-size: 1rem; }
      .hm-count { color: var(--hm-muted); font-size: .85rem; margin-left: .5rem; }
      .hm-legend {
        display: flex; align-items: center; gap: 4px;
        font-size: .8rem; color: var(--hm-muted);
        margin-top: 1rem; margin-bottom: 1.5rem;
      }
      .hm-legend-box { width: ${CELL}px; height: ${CELL}px; border-radius: 3px; }
      .hm-summary-title {
        color: var(--hm-muted);
        font-size: .9rem;
        margin-bottom: .7rem;
      }
      .hm-summary-stats {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .hm-summary-stat {
        color: var(--hm-text);
      }
      .hm-summary-stat strong {
        color: var(--hm-muted);
        margin-right: .35rem;
      }
    </style>

    <div style="position:relative;height:16px;width:${totalWidth}px;margin-bottom:4px">
      ${monthHeader}
    </div>

    <div style="position:relative;width:${totalWidth}px;height:${gridH}px">
      ${dayLabels}
      ${cells}
    </div>

    <div class="hm-legend">
      -
      <div class="hm-legend-box" style="background:var(--hm-empty)"></div>
      <div class="hm-legend-box" style="background:#fdca98"></div>
      <div class="hm-legend-box" style="background:#fda460"></div>
      <div class="hm-legend-box" style="background:#fd8235"></div>
      <div class="hm-legend-box" style="background:#e24b0f"></div>
      <div class="hm-legend-box" style="background:#9c2f07"></div>
      +
    </div>

    <div class="hm-detail" id="hm-detail">
      <em>Clique sur un jour pour voir les activités</em>
    </div>

    <div class="hm-detail" id="hm-summary">
        <span class="hm-date">Compteurs globaux</span>
        <ul>
            <li>Resolve : ${totals.resolve}</li>
            <li>RETEX : ${totals.retex}</li>
            <li>Autre : ${totals.autre}</li>
        </ul>
    </div>
    `;

    document.querySelectorAll(".hm-day").forEach(el => {
        el.addEventListener("click", () => {
            document.querySelectorAll(".hm-day.active").forEach(a => a.classList.remove("active"));
            el.classList.add("active");

            const date = el.dataset.date;
            const count = parseInt(el.dataset.count, 10);
            const detail = document.getElementById("hm-detail");
            const d = data[date];

            if (!count || !d) {
                detail.innerHTML = `<span class="hm-date">${date}</span> — <em>Aucune activité enregistrée.</em>`;
                return;
            }

            const items = d.activités.map(colorize).join("");
            detail.innerHTML = `
                <span class="hm-date">${date}</span>
                <span class="hm-count">${count} activité${count > 1 ? "s" : ""}</span>
                <ul>${items}</ul>
            `;

        });
    });
};

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("nav", init);