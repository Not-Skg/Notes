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
    const JOURS = ["L", "Ma", "Me", "J", "V", "S", "D"];
    const JOURS_A_AFFICHER = new Set([1, 3, 5]); // Mardi, Jeudi, Samedi

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
        const centerX = LABEL_W + colToPx((min + max) / 2) + (CELL / 2);
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

    const totals = data.__totaux__ || { resolve: 0, retex: 0, autre: 0 };

    root.innerHTML = `
    <style>
      #heatmap-root { font-family: inherit; }
      .hm-day { width: ${CELL}px; height: ${CELL}px; border-radius: 3px; cursor: pointer; transition: transform .1s; outline: 2px solid transparent; }
      .hm-day:hover { transform: scale(1.4); }
      .hm-day.active { outline-color: var(--hm-active); outline-offset: 1px; }
      .hm-detail { padding: 1rem 1.2rem; border: 1px solid var(--hm-border); border-radius: 8px; min-height: 64px; color: var(--hm-text); margin-top: 1.5rem; }
      .hm-detail ul { margin: .6rem 0 0; padding-left: 1.2rem; }
      .hm-date { font-weight: 500; }
      .hm-stats { display: flex; gap: .75rem; margin-top: 1rem; font-size: .85rem; color: var(--hm-muted); }
      .hm-stat { padding: .2rem .5rem; border-radius: 4px; background: rgba(128,128,128,0.1); }
    </style>
    <div style="position:relative;height:16px;width:${totalWidth}px;margin-bottom:4px">${monthHeader}</div>
    <div style="position:relative;width:${totalWidth}px;height:${gridH}px">${dayLabels}${cells}</div>
    <div class="hm-stats">
        <span><strong>${totals.resolve}</strong> Resolve</span>
        <span><strong>${totals.retex}</strong> RETEX</span>
        <span><strong>${totals.autre}</strong> Autre</span>
    </div>
    <div class="hm-detail" id="hm-detail"><em>Clique sur un jour</em></div>
    `;

    document.querySelectorAll(".hm-day").forEach(el => {
        el.addEventListener("click", () => {
            document.querySelectorAll(".hm-day.active").forEach(a => a.classList.remove("active"));
            el.classList.add("active");
            const d = data[el.dataset.date];
            const s = d?.stats || { resolve: 0, retex: 0, autre: 0 };
            document.getElementById("hm-detail").innerHTML = `
                <span class="hm-date">${el.dataset.date}</span>
                <ul>
                    >Resolve: ${s.resolve}</li>
                    >RETEX: ${s.retex}</li>
                    >Autre: ${s.autre}</li>
                </ul>
            `;
        });
    });
};

document.addEventListener("DOMContentLoaded", init);