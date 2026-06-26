const init = async () => {
    const heatmapRoot = document.getElementById("heatmap-root");
    const statsRoot = document.getElementById("site-stats-root");
    if (!heatmapRoot && !statsRoot) return;

    const base = document.querySelector('meta[name="base-url"]')?.content || "";

    const candidates = [
        `${base}/static/activity.json`,
        `/static/activity.json`,
        `./static/activity.json`,
        `static/activity.json`,
    ];

    let res = null;
    let usedPath = null;

    for (const path of candidates) {
        try {
            const test = await fetch(path);
            if (test.ok) {
                res = test;
                usedPath = path;
                break;
            }
        } catch (_) { }
    }

    if (!res) {
        console.error("Impossible de charger activity.json avec les chemins testés :", candidates);
        return;
    }

    console.log("activity.json chargé via :", usedPath);
    const data = await res.json();

    const ACTIVITY_COLORS = {
        Resolve: "#c49a6c",
        Retex: "#fd8235",
        Created: "#9FE1CB",
    };

    const ACTIVITY_LABELS = {
        Resolve: "RESOLVED",
        Retex: "RETEX",
        Created: "CREATED",
    };

    const extractType = (text) => {
        const dashIdx = text.indexOf(" — ");
        if (dashIdx === -1) return "Autre";
        return text.slice(0, dashIdx).trim();
    };

    const extractPlatform = (text) => {
        const lastDotIndex = text.lastIndexOf(" · ");
        return lastDotIndex === -1 ? "Inconnu" : text.slice(lastDotIndex + 3).trim();
    };

    const extractName = (text) => {
        const dashIdx = text.indexOf(" — ");
        if (dashIdx === -1) return text.trim();
        const rest = text.slice(dashIdx + 3).trim();
        const lastDotIndex = rest.lastIndexOf(" · ");
        return lastDotIndex === -1 ? rest : rest.slice(0, lastDotIndex).trim();
    };

    const recentActivities = Object.keys(data)
        .filter(date => date !== "__totaux__" && date !== "__badges__" && date !== "__assets__")
        .sort((a, b) => new Date(b) - new Date(a))
        .flatMap(date => {
            const day = data[date];
            if (!day?.activités) return [];
            return day.activités.map(activity => {
                const type = extractType(activity);
                return {
                    date,
                    type,
                    typeLabel: ACTIVITY_LABELS[type] || type.toUpperCase(),
                    typeColor: ACTIVITY_COLORS[type] || "var(--hm-muted)",
                    name: extractName(activity),
                    platform: extractPlatform(activity),
                };
            });
        })
        .slice(0, 6);

    const recentActivitiesHtml = recentActivities.length
        ? recentActivities.map(item => `
            <div class="hm-recent-item">
                <div class="hm-recent-meta">
                    <span class="hm-recent-date">${item.date}</span>
                    <span class="hm-recent-type" style="color:${item.typeColor}">— ${item.typeLabel}</span>
                </div>
                <div class="hm-recent-name">${item.name}</div>
                <div class="hm-recent-platform">${item.platform}</div>
            </div>
        `).join("")
        : `<div class="hm-recent-empty">Aucune activité récente</div>`;

    const platformCounts = { retex: {}, resolve: {} };
    Object.keys(data).forEach(date => {
        if (date === "__totaux__" || date === "__badges__" || date === "__assets__") return;
        const dayData = data[date];
        if (!dayData?.activités) return;
        dayData.activités.forEach(activity => {
            const platform = extractPlatform(activity);
            if (activity.startsWith("Retex")) {
                platformCounts.retex[platform] = (platformCounts.retex[platform] || 0) + 1;
            } else if (activity.startsWith("Resolve")) {
                platformCounts.resolve[platform] = (platformCounts.resolve[platform] || 0) + 1;
            }
        });
    });

    const getAllPlatforms = (counts) => Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const getTop3Platforms = (counts) => Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);

    const allRetexPlatforms = getAllPlatforms(platformCounts.retex);
    const allResolvePlatforms = getAllPlatforms(platformCounts.resolve);

    const topRetexPlatformsForLegend = getTop3Platforms(platformCounts.retex);
    const topResolvePlatformsForLegend = getTop3Platforms(platformCounts.resolve);

    const platformColors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3"];

    const maxRetexCount = Math.max(...allRetexPlatforms.map(p => p[1]), 1);
    const maxResolveCount = Math.max(...allResolvePlatforms.map(p => p[1]), 1);

    const platformToColor = new Map();
    const allPlatforms = [...new Set([...allRetexPlatforms.map(p => p[0]), ...allResolvePlatforms.map(p => p[0])])];
    allPlatforms.forEach((platform, i) => {
        platformToColor.set(platform, platformColors[i % platformColors.length]);
    });

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

        const [, m, d] = date.split("-").map(Number);
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
        if (dashIdx === -1) return `<li>${text}</li>`;
        const keyword = text.slice(0, dashIdx);
        const rest = text.slice(dashIdx + 3);
        const keywordColor = keywords[keyword];
        if (!keywordColor) return `<li>${text}</li>`;
        const parts = rest.split(" · ");
        const name = parts[0];
        const context = parts.slice(1).join(" · ");
        return `<li>
            <span style="color:${keywordColor};font-weight:500">${keyword}</span>
            <span style="color:${keywordColor};font-weight:300"> — </span>
            <span style="font-weight:500">${name}</span>
            ${context ? `<span style="color:var(--hm-muted);font-size:.9em"> · ${context}</span>` : ""}
        </li>`;
    };

    const totals = data.__totaux__ || { resolve: 0, retex: 0, autre: 0 };
    const assets = data.__assets__ || { profils: 0, badges: 0 };

    const totalActivities = totals.resolve + totals.retex + totals.autre;
    const resolvePercent = totalActivities > 0 ? (totals.resolve / totalActivities) * 100 : 0;
    const retexPercent = totalActivities > 0 ? (totals.retex / totalActivities) * 100 : 0;
    const autrePercent = totalActivities > 0 ? (totals.autre / totalActivities) * 100 : 0;

    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
    let monthResolve = 0;
    let monthRetex = 0;

    Object.keys(data).forEach(date => {
        if (date === "__totaux__" || date === "__badges__" || date === "__assets__") return;
        if (!date.startsWith(currentMonth)) return;
        const day = data[date];
        if (!day?.activités) return;
        day.activités.forEach(activity => {
            if (activity.startsWith("Resolve")) monthResolve += 1;
            else if (activity.startsWith("Retex")) monthRetex += 1;
        });
    });

    const activePlatforms = assets.profils ?? 0;
    const badgeCount = assets.badges ?? 0;

    const sharedStyle = `
      <style>
        @media (prefers-color-scheme: light) {
          #heatmap-root, #site-stats-root {
            --hm-empty: #b3b3b5;
            --hm-border: rgba(160, 82, 45, 0.3);
            --hm-text: #2a211d;
            --hm-muted: #6f625c;
            --hm-active: #a0522d;
            --hm-card-bg: #ffffff;
            --hm-accent: #d86f2d;
            --hm-accent-soft: #b85b22;
          }
        }

        @media (prefers-color-scheme: dark) {
          #heatmap-root, #site-stats-root {
            --hm-empty: #5c5b5b;
            --hm-border: rgba(255, 255, 255, 0.08);
            --hm-text: #ebebec;
            --hm-muted: #a29a95;
            --hm-active: #c4845a;
            --hm-card-bg: rgba(17, 19, 23, 0.72);
            --hm-accent: #ff8a3d;
            --hm-accent-soft: #ff9b5c;
          }
        }

        #heatmap-root, #site-stats-root { font-family: inherit; }
        #site-stats-root { margin-bottom: 1.2rem; }

        .hm-site-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
        }

        .hm-stat-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 0;
          min-height: 122px;
          padding: 1.1rem 1.2rem;
          border: 1px solid var(--hm-border);
          border-radius: 14px;
          color: var(--hm-text);
          background: var(--hm-card-bg);
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .hm-stat-link {
          transition: transform .14s ease, border-color .14s ease, box-shadow .14s ease;
        }

        .hm-stat-link:hover {
          transform: translateY(-2px);
          border-color: var(--hm-accent);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }

        .hm-stat-value {
          font-size: 2.35rem;
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--hm-accent);
          margin-bottom: 0.7rem;
        }

        .hm-stat-label {
          font-size: 1rem;
          line-height: 1.3;
          font-weight: 650;
          color: var(--hm-text);
          margin-bottom: 0.38rem;
        }

        .hm-stat-sub {
          font-size: 0.87rem;
          line-height: 1.3;
          font-weight: 600;
          color: var(--hm-accent-soft);
        }

        .hm-heatmap-panel {
          min-width: 0;
          margin-bottom: 1rem;
        }

        .hm-heatmap-block {
          display: block;
          width: 100%;
          min-width: 0;
        }

        .hm-below-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 320px);
          column-gap: 3.25rem;
          row-gap: 1rem;
          align-items: start;
        }

        .hm-below-grid > * {
          min-width: 0;
        }

        .hm-recent-panel {
          padding: 1rem 1rem;
          border: 1px solid var(--hm-border);
          border-radius: 12px;
          background: var(--hm-card-bg);
          color: var(--hm-text);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          min-width: 0;
        }

        .hm-recent-title {
          display: block;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--hm-text);
          margin-bottom: 0.85rem;
        }

        .hm-recent-list {
          display: flex;
          flex-direction: column;
          gap: 0.72rem;
        }

        .hm-recent-item {
          padding-bottom: 0.72rem;
          border-bottom: 1px solid var(--hm-border);
        }

        .hm-recent-item:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }

        .hm-recent-meta {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
          margin-bottom: 0.18rem;
        }

        .hm-recent-date {
          font-size: 0.76rem;
          color: var(--hm-muted);
        }

        .hm-recent-type {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        .hm-recent-name {
          font-size: 0.93rem;
          font-weight: 650;
          color: var(--hm-text);
          line-height: 1.3;
          margin-bottom: 0.12rem;
          word-break: break-word;
        }

        .hm-recent-platform {
          font-size: 0.8rem;
          color: var(--hm-accent-soft);
          line-height: 1.25;
          word-break: break-word;
        }

        .hm-recent-empty {
          font-size: 0.9rem;
          color: var(--hm-muted);
        }

        .hm-heatmap-scroll {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          padding-bottom: 0.35rem;
        }

        .hm-heatmap-inner {
          width: ${totalWidth}px;
          min-width: ${totalWidth}px;
        }

        .hm-day {
          width: ${CELL}px;
          height: ${CELL}px;
          border-radius: 3px;
          cursor: pointer;
          transition: transform .1s;
          outline: 2px solid transparent;
        }

        .hm-day:hover { transform: scale(1.4); }
        .hm-day.active { outline-color: var(--hm-active); outline-offset: 1px; }

        .hm-detail, .hm-summary {
          padding: 1rem 1.2rem;
          border: 1px solid var(--lightgray);
          border-radius: 8px;
        }

        .hm-detail {
          min-width: 0;
          min-height: 64px;
          color: var(--hm-text);
          margin-top: 0;
          width: 100%;
          overflow: hidden;
        }

        .hm-summary { margin-top: 1rem; }
        .hm-detail em { color: var(--hm-muted); }
        .hm-detail ul { margin: .6rem 0 0; padding-left: 1.2rem; }
        .hm-detail li { margin: .3rem 0; }
        .hm-date { color: var(--hm-muted); font-weight: 500; font-size: 1rem; }
        .hm-count { color: var(--hm-muted); font-size: .85rem; margin-left: .5rem; }

        .hm-legend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: .8rem;
          color: var(--hm-muted);
          margin-top: 1rem;
          margin-bottom: 0;
          flex-wrap: wrap;
        }

        .hm-legend-box {
          width: ${CELL}px;
          height: ${CELL}px;
          border-radius: 3px;
        }

        .hm-donut-and-bars {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 3rem;
          width: 100%;
          flex-wrap: wrap;
        }

        .hm-donut-chart {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .hm-donut-svg {
          width: 100px;
          height: 100px;
        }

        .hm-donut-total {
          font-size: 1.1rem;
          font-weight: bold;
          fill: var(--hm-text);
        }

        .hm-donut-legend {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .hm-donut-legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .hm-donut-legend-color {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .hm-bars-container {
          display: flex;
          gap: 3rem;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .hm-bar-chart {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.3rem;
          width: 120px;
        }

        .hm-bar-title {
          font-size: 0.9rem;
          font-weight: 500;
          width: 100%;
          text-align: center;
        }

        .hm-bar-and-legend {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .hm-bar {
          width: 20px;
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          border-left: 1px solid var(--hm-border);
          border-bottom: 1px solid var(--hm-border);
          position: relative;
        }

        .hm-bar-segment {
          width: 100%;
          transition: height 0.3s ease;
          white-space: nowrap;
        }

        .hm-bar-legend {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          font-size: 0.8rem;
          min-width: 100px;
        }

        .hm-bar-legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
        }

        .hm-bar-legend-color {
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        @media (max-width: 980px) {
          .hm-below-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .hm-site-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .hm-site-stats {
            grid-template-columns: 1fr;
          }

          .hm-stat-card {
            min-height: auto;
          }

          .hm-stat-value {
            font-size: 2rem;
          }

          .hm-donut-chart {
            flex-direction: column;
            align-items: flex-start;
          }

          .hm-bars-container {
            gap: 1.5rem;
          }
        }
      </style>
    `;

    if (statsRoot) {
        statsRoot.innerHTML = `
        ${sharedStyle}
        <div class="hm-site-stats">
            <div class="hm-stat-card">
                <strong class="hm-stat-value">${totals.resolve}</strong>
                <span class="hm-stat-label">Challenges résolus</span>
                <span class="hm-stat-sub">+ ${monthResolve} ce mois</span>
            </div>
            <div class="hm-stat-card">
                <strong class="hm-stat-value">${totals.retex}</strong>
                <span class="hm-stat-label">RETEX publiés</span>
                <span class="hm-stat-sub">+ ${monthRetex} ce mois</span>
            </div>
            <a class="hm-stat-card hm-stat-link" href="#mon-profil-sur-les-plateformes-interessantes">
                <strong class="hm-stat-value">${activePlatforms}</strong>
                <span class="hm-stat-label">Plateformes actives</span>
                <span class="hm-stat-sub">Voir mes profils</span>
            </a>
            <a class="hm-stat-card hm-stat-link" href="#mes-badges">
                <strong class="hm-stat-value">${badgeCount}</strong>
                <span class="hm-stat-label">Badges obtenus</span>
                <span class="hm-stat-sub">Voir mes badges</span>
            </a>
        </div>
        `;
    }

    if (heatmapRoot) {
        heatmapRoot.innerHTML = `
        ${sharedStyle}

        <div class="hm-heatmap-panel">
          <div class="hm-heatmap-block">
            <div class="hm-heatmap-scroll">
              <div class="hm-heatmap-inner">
                <div style="position:relative;height:16px;width:${totalWidth}px;margin-bottom:4px">${monthHeader}</div>
                <div style="position:relative;width:${totalWidth}px;height:${gridH}px">${dayLabels}${cells}</div>
              </div>
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
          </div>
        </div>

        <div class="hm-below-grid">
          <div class="hm-detail" id="hm-detail"><em>Clique sur un jour pour voir les activités</em></div>

          <aside class="hm-recent-panel">
            <span class="hm-recent-title">Activités récentes</span>
            <div class="hm-recent-list">
              ${recentActivitiesHtml}
            </div>
          </aside>
        </div>

        <div class="hm-summary">
            <span class="hm-date">Compteurs globaux</span>
            <div class="hm-donut-and-bars">
                <div class="hm-donut-chart">
                    <svg viewBox="0 0 100 100" class="hm-donut-svg">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--hm-empty)" stroke-width="10" stroke-dasharray="283" stroke-dashoffset="0" transform="rotate(-90 50 50)" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#c49a6c" stroke-width="8" stroke-dasharray="${resolvePercent * 2.83} 283" stroke-dashoffset="0" transform="rotate(-90 50 50)" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#fd8235" stroke-width="8" stroke-dasharray="${retexPercent * 2.83} 283" stroke-dashoffset="${-resolvePercent * 2.83}" transform="rotate(-90 50 50)" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#9FE1CB" stroke-width="8" stroke-dasharray="${autrePercent * 2.83} 283" stroke-dashoffset="${-(resolvePercent + retexPercent) * 2.83}" transform="rotate(-90 50 50)" />
                        <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" class="hm-donut-total">${totalActivities}</text>
                    </svg>
                    <div class="hm-donut-legend">
                        <div class="hm-donut-legend-item"><span class="hm-donut-legend-color" style="background: #c49a6c;"></span><span>Resolve: ${totals.resolve}</span></div>
                        <div class="hm-donut-legend-item"><span class="hm-donut-legend-color" style="background: #fd8235;"></span><span>RETEX: ${totals.retex}</span></div>
                        <div class="hm-donut-legend-item"><span class="hm-donut-legend-color" style="background: #9FE1CB;"></span><span>Autre: ${totals.autre}</span></div>
                    </div>
                </div>
                <div class="hm-bars-container">
                    <div class="hm-bar-chart">
                        <span class="hm-bar-title">RETEX</span>
                        <div class="hm-bar-and-legend">
                            <div class="hm-bar">
                                ${allRetexPlatforms.map(([platform, count]) => {
            const barColor = platformToColor.get(platform);
            return `<div class="hm-bar-segment" style="height: ${(count / maxRetexCount) * 100}%; background: ${barColor};" title="${platform}: ${count}"></div>`;
        }).join("")}
                            </div>
                            <div class="hm-bar-legend">
                                ${topRetexPlatformsForLegend.map(([platform, count]) => {
            const legendColor = platformToColor.get(platform);
            return `<div class="hm-bar-legend-item"><span class="hm-bar-legend-color" style="background: ${legendColor};"></span><span>${platform}: ${count}</span></div>`;
        }).join("")}
                            </div>
                        </div>
                    </div>
                    <div class="hm-bar-chart">
                        <span class="hm-bar-title">Resolve</span>
                        <div class="hm-bar-and-legend">
                            <div class="hm-bar">
                                ${allResolvePlatforms.map(([platform, count]) => {
            const barColor = platformToColor.get(platform);
            return `<div class="hm-bar-segment" style="height: ${(count / maxResolveCount) * 100}%; background: ${barColor};" title="${platform}: ${count}"></div>`;
        }).join("")}
                            </div>
                            <div class="hm-bar-legend">
                                ${topResolvePlatformsForLegend.map(([platform, count]) => {
            const legendColor = platformToColor.get(platform);
            return `<div class="hm-bar-legend-item"><span class="hm-bar-legend-color" style="background: ${legendColor};"></span><span>${platform}: ${count}</span></div>`;
        }).join("")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        const scrollEl = heatmapRoot.querySelector(".hm-heatmap-scroll");
        if (scrollEl) {
            scrollEl.scrollLeft = Math.max(0, scrollEl.scrollWidth - scrollEl.clientWidth);
        }
    }

    document.querySelectorAll(".hm-day").forEach(el => {
        el.addEventListener("click", () => {
            document.querySelectorAll(".hm-day.active").forEach(a => a.classList.remove("active"));
            el.classList.add("active");

            const date = el.dataset.date;
            const count = parseInt(el.dataset.count, 10);
            const detail = document.getElementById("hm-detail");
            const d = data[date];

            if (!detail) return;

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