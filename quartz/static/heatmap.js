const init = async () => {
    const heatmapRoot = document.getElementById("heatmap-root");
    const statsRoot = document.getElementById("site-stats-root");
    const badgesRoot = document.getElementById("badges-root");
    if (!heatmapRoot && !statsRoot && !badgesRoot) return;

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

    const milestones = {
        "2026-03-11": {
            marker: "S",
            label: "Création du site",
        },
        "2026-04-17": {
            marker: "H",
            label: "Ajout de la heatmap",
        },
    };

    const badges = [
        {
            src: "Badges/badge-5cf43f67e1ab99e6.png",
            href: "https://www.badgeforge.eu/verify/5cf43f67e1ab99e6b9450a50f6adae4e5de73c481e22e132598c822046a5e2a8",
            alt: "Finisher Medileak 3",
        },
        {
            src: "Badges/openbadge-OZ-2026-ZH5LL3.png",
            href: "https://permis-osint.fr/verifier/OZ-2026-ZH5LL3",
            alt: "Permis d'Osinter'",
        },
        {
            src: "Badges/AI1.png",
            href: "https://www.badgeforge.eu/verify/9f1a8de37357ffb4ab1bb9fa1581e6664f00fda7eddeea73e91e7dd0e64ff1bc",
            alt: "ADOPTION 2026-FINISHER",
        },
        {
            src: "Badges/AOO2025.png",
            href: "https://www.badgeforge.eu/verify/c53f517cb3204c6ddc7b2043f824cb15cd120581cb240b047c6f09da2b0a1024",
            alt: "Advent Of OSINT 2025-FINISHER",
        },
        {
            src: "Badges/HCF.png",
            href: "https://www.badgeforge.eu/verify/8bf59f1c3d572c542c16de5a66161fadeffeeeb1081f56b58395c07fb46fd1d6",
            alt: "HATES 2025-FINISHER",
        },
        {
            src: "Badges/OPB.png",
            href: "https://www.badgeforge.eu/verify/93a95b277c3fe4e7fcc26f53d325d18da446e4e72bc56d5a7b50104990caf520",
            alt: "OSINT: Practical Basics",
        },
        {
            src: "Badges/GNOSINT2025.png",
            href: "https://www.badgeforge.eu/verify/ec2013798801bbb46f0d6b682e220adbdc37d34741d535b19b05160cb05956e5",
            alt: "GNOSINT 2025-FINISHER",
        },
        {
            src: "Badges/f1.png",
            href: "https://mooc.osintfr.com/badges/badge.php?hash=9da3cc793fc856168bb5816420fcecd160e24981",
            alt: "1er MOOC OSINT-FR",
        }
    ];

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

    const allRetexPlatforms = getAllPlatforms(platformCounts.retex);
    const allResolvePlatforms = getAllPlatforms(platformCounts.resolve);

    const platformColors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#a78bfa", "#34d399"];

    const platformToColor = new Map();
    const allPlatforms = [...new Set([...allRetexPlatforms.map(p => p[0]), ...allResolvePlatforms.map(p => p[0])])];
    allPlatforms.forEach((platform, i) => {
        platformToColor.set(platform, platformColors[i % platformColors.length]);
    });

    const globalLegendHtml = allPlatforms.length
        ? `
            <div class="hm-summary-block">
                <div class="hm-summary-title">Les plateformes</div>
                <div class="hm-hbar-legend hm-hbar-legend-global">
                    ${allPlatforms.map((platform) => `
                        <div class="hm-hbar-legend-item">
                            <span class="hm-hbar-legend-color" style="background:${platformToColor.get(platform)};"></span>
                            <span>${platform}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
        `
        : "";

    const formatLocalDate = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    };

    const getPreviousDate = (dateStr) => {
        const d = new Date(dateStr + "T12:00:00");
        d.setDate(d.getDate() - 1);
        return formatLocalDate(d);
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

    const activeDates = new Set(days.filter(date => (data[date]?.count || 0) > 0));

    let currentStreak = 0;
    let streakAnchor = todayStr;

    while (activeDates.has(streakAnchor)) {
        currentStreak += 1;
        streakAnchor = getPreviousDate(streakAnchor);
    }

    let longestStreak = 0;
    let runLength = 0;
    let prevActiveDate = null;

    for (const date of days) {
        if (!activeDates.has(date)) {
            runLength = 0;
            prevActiveDate = null;
            continue;
        }

        const expectedPrev = prevActiveDate ? getPreviousDate(date) : null;

        if (prevActiveDate && prevActiveDate === expectedPrev) {
            runLength += 1;
        } else {
            runLength = 1;
        }

        if (runLength > longestStreak) {
            longestStreak = runLength;
        }

        prevActiveDate = date;
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
        const milestone = milestones[date];

        return `<div class="hm-day${milestone ? " hm-day-milestone" : ""}"
            style="position:absolute;left:${cx}px;top:${cy}px;background:${color(count)}"
            data-date="${date}"
            data-count="${count}"
            ${milestone ? `data-marker="${milestone.marker}" data-marker-label="${milestone.label}"` : ""}
            title="${date} — ${count} activité(s)${milestone ? ` — ${milestone.label}` : ""}"
        ></div>`;
    }).join("");

    const dayLabels = JOURS.map((label, i) => {
        if (!JOURS_A_AFFICHER.has(i)) return "";
        const y = i * step + 2;
        return `<div style="position:absolute;top:${y}px;left:0;width:${LABEL_W - 4}px;font-size:10px;color:var(--hm-muted);text-align:right">${label}</div>`;
    }).join("");

    const colorize = (text) => {
        const keywords = {
            Resolve: "#c49a6c",
            Retex: "#fd8235",
            Created: "#9FE1CB",
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

    const activitySegments = [
        { label: "Autres", value: totals.autre, color: "#9FE1CB" },
        { label: "RETEX", value: totals.retex, color: "#fd8235" },
        { label: "Resolve", value: totals.resolve, color: "#c49a6c" },
    ].filter(item => item.value > 0);

    const renderHorizontalSegments = (items, total, emptyLabel = "Aucune donnée") => {
        if (!items.length || total <= 0) {
            return `<div class="hm-hbar-empty">${emptyLabel}</div>`;
        }

        return `
            <div class="hm-hbar-track">
                ${items.map(({ label, value, color }) => `
                    <div
                        class="hm-hbar-segment"
                        style="width:${(value / total) * 100}%;background:${color};"
                        title="${label}: ${value}"
                    >
                        <span class="hm-hbar-segment-label">${label}</span>
                    </div>
                `).join("")}
            </div>
        `;
    };

    const renderPlatformSegments = (entries) => {
        const total = entries.reduce((sum, [, count]) => sum + count, 0);

        if (!entries.length || total <= 0) {
            return `<div class="hm-hbar-empty">Aucune donnée</div>`;
        }

        return `
            <div class="hm-hbar-track">
                ${entries.map(([platform, count]) => `
                    <div
                        class="hm-hbar-segment"
                        style="width:${(count / total) * 100}%;background:${platformToColor.get(platform)};"
                        title="${platform}: ${count}"
                    >
                        <span class="hm-hbar-segment-label">${count}</span>
                    </div>
                `).join("")}
            </div>
        `;
    };

    const sharedStyle = `
      <style>
        @media (prefers-color-scheme: light) {
          #heatmap-root, #site-stats-root, #badges-root {
            --hm-empty: #b3b3b5;
            --hm-border: rgba(160, 82, 45, 0.3);
            --hm-text: #2a211d;
            --hm-muted: #6f625c;
            --hm-active: #a0522d;
            --hm-card-bg: transparent;
            --hm-accent: #d86f2d;
            --hm-accent-soft: #b85b22;
          }

          .hm-stat-card,
          .hm-recent-panel,
          .hm-badges-panel {
            box-shadow: none;
          }
        }

        @media (prefers-color-scheme: dark) {
          #heatmap-root, #site-stats-root, #badges-root {
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

        #heatmap-root, #site-stats-root, #badges-root { font-family: inherit; }
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

        .hm-badges-panel {
          padding: 0.1rem 1.2rem;
          border: 1px solid var(--hm-border);
          border-radius: 8px;
          background: var(--hm-card-bg);
          color: var(--hm-text);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .hm-badges-scroll {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          padding-bottom: 0.35rem;
        }

        .hm-badges-row {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.55rem;
          align-items: center;
          width: max-content;
          min-width: 100%;
        }

        .hm-badge-link {
          display: inline-flex;
          flex: 0 0 auto;
          text-decoration: none;
        }

        .hm-badge-img {
          display: block;
          height: 54px;
          width: auto;
          border-radius: 8px;
          transition: transform .12s ease, opacity .12s ease;
        }

        .hm-badge-link:hover .hm-badge-img {
          transform: translateY(-1px);
          opacity: 0.92;
        }

        .hm-top-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 290px;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1rem;
          min-width: 0;
        }

        .hm-heatmap-panel {
          min-width: 0;
          margin-bottom: 0;
          display: flex;
          align-items: center;
          overflow: visible;
        }

        .hm-heatmap-block {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          min-width: 0;
          height: 100%;
          padding-block: 0.25rem;
          overflow: visible;
        }

        .hm-below-grid {
          display: block;
          margin-bottom: 1rem;
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
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          overscroll-behavior-x: contain;
          overscroll-behavior-y: contain;
          touch-action: pan-x;
          scrollbar-gutter: stable;
          scrollbar-width: thin;
          scrollbar-color: var(--hm-accent-soft) color-mix(in srgb, var(--hm-empty) 16%, transparent);
          padding-bottom: 10px;
        }

        .hm-heatmap-scroll::-webkit-scrollbar {
          height: 12px;
          -webkit-appearance: none;
        }

        .hm-heatmap-scroll::-webkit-scrollbar-track {
          background: color-mix(in srgb, var(--hm-empty) 16%, transparent);
          border-radius: 999px;
        }

        .hm-heatmap-scroll::-webkit-scrollbar-thumb {
          background: var(--hm-accent-soft);
          border-radius: 999px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .hm-heatmap-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--hm-accent);
          background-clip: padding-box;
        }

        .hm-heatmap-inner {
          display: inline-block;
          width: ${totalWidth}px;
          min-width: ${totalWidth}px;
          max-width: none;
          vertical-align: top;
        }

        .hm-day {
          position: absolute;
          width: ${CELL}px;
          height: ${CELL}px;
          border-radius: 3px;
          cursor: pointer;
          transition: transform .1s;
          outline: 2px solid transparent;
        }

        .hm-day:hover { transform: scale(1.4); }
        .hm-day.active { outline-color: var(--hm-active); outline-offset: 1px; }

        .hm-day-milestone {
          outline: 1px solid rgba(255, 255, 255, 0.55);
          outline-offset: -1px;
        }

        .hm-day-milestone::after {
          content: attr(data-marker);
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          font-size: 0.5rem;
          font-weight: 800;
          line-height: 1;
          color: #ffffff;
          text-shadow: 0 0 2px rgba(0, 0, 0, 0.45);
          pointer-events: none;
        }

        .hm-detail, .hm-summary {
          padding: 1rem 1.2rem;
          border: 1px solid var(--lightgray);
          border-radius: 8px;
        }

        .hm-detail {
          min-width: 0;
          width: 100%;
          max-width: 290px;
          height: 260px;
          min-height: 260px;
          max-height: 260px;
          color: var(--hm-text);
          margin-top: 0;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          box-sizing: border-box;
          align-self: center;
        }

        .hm-detail-sticky {
            position: sticky;
            top: 0;
            z-index: 3;
            background: var(--background);
            padding: 0.35rem 0 0.7rem 0;
            margin: -0.15rem 0 0.7rem 0;
            border-bottom: 1px solid var(--hm-border);
        }

        .hm-detail-body {
          min-width: 0;
        }

        .hm-summary {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .hm-detail em { color: var(--hm-muted); }
        .hm-detail ul { margin: .6rem 0 0; padding-left: 1.2rem; }
        .hm-detail li { margin: .3rem 0; }
        .hm-date { color: var(--hm-muted); font-weight: 500; font-size: 1rem; }
        .hm-count { color: var(--hm-muted); font-size: .85rem; margin-left: .5rem; }

        .hm-legend-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }

        .hm-legend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: .8rem;
          color: var(--hm-muted);
          margin: 0;
          flex-wrap: wrap;
        }

        .hm-legend-box {
          width: ${CELL}px;
          height: ${CELL}px;
          border-radius: 3px;
        }

        .hm-milestone-legend {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          font-size: .8rem;
          color: var(--hm-muted);
        }

        .hm-milestone-key {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .hm-milestone-letter {
          display: inline-grid;
          place-items: center;
          width: ${CELL}px;
          height: ${CELL}px;
          border-radius: 3px;
          background: #7a7a7a;
          color: #fff;
          font-size: 0.55rem;
          font-weight: 800;
          line-height: 1;
          outline: 1px solid rgba(255, 255, 255, 0.45);
          outline-offset: -1px;
        }

        .hm-streak-inline {
          margin-left: auto;
          display: flex;
          align-items: baseline;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hm-streak-mini {
          display: inline-flex;
          align-items: baseline;
          gap: 0.38rem;
          color: var(--hm-muted);
          font-size: 0.8rem;
          white-space: nowrap;
        }

        .hm-streak-mini-label {
          color: var(--hm-muted);
          font-weight: 500;
        }

        .hm-streak-mini-value {
          color: var(--hm-accent);
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .hm-summary-block {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .hm-summary-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--hm-text);
        }

        .hm-hbar-track {
          width: 100%;
          min-height: 44px;
          display: flex;
          overflow: hidden;
          border: 1px solid var(--hm-border);
          border-radius: 10px;
          background: color-mix(in srgb, var(--hm-empty) 18%, transparent);
        }

        .hm-hbar-segment {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 26px;
          padding: 0.55rem 0.45rem;
          color: #fff;
          font-size: 0.84rem;
          font-weight: 700;
          line-height: 1.1;
          white-space: nowrap;
          border-right: 1px solid rgba(0, 0, 0, 0.22);
        }

        .hm-hbar-segment:last-child {
          border-right: none;
        }

        .hm-hbar-segment-label {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .hm-hbar-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
        }

        .hm-hbar-legend-global {
          margin-top: 0.25rem;
        }

        .hm-hbar-legend-item {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.84rem;
          color: var(--hm-muted);
        }

        .hm-hbar-legend-color {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          flex: 0 0 auto;
        }

        .hm-hbar-empty {
          padding: 0.85rem 1rem;
          border: 1px dashed var(--hm-border);
          border-radius: 10px;
          color: var(--hm-muted);
          font-size: 0.9rem;
        }

        @media (max-width: 980px) {
          .hm-top-grid {
            grid-template-columns: 1fr;
            align-items: stretch;
          }

          .hm-heatmap-panel,
          .hm-heatmap-block {
            overflow: visible;
          }

          .hm-detail {
            max-width: 100%;
            width: 100%;
            height: 220px;
            min-height: 220px;
            max-height: 220px;
            align-self: stretch;
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

          .hm-legend-row {
            align-items: flex-start;
          }

          .hm-streak-inline {
            margin-left: 0;
            width: 100%;
            justify-content: flex-start;
          }

          .hm-badge-img {
            height: 48px;
          }

          .hm-hbar-track {
            min-height: 38px;
          }

          .hm-hbar-segment {
            font-size: 0.76rem;
            padding: 0.45rem 0.25rem;
          }

          .hm-hbar-legend {
            flex-direction: column;
            gap: 0.35rem;
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
            <a class="hm-stat-card hm-stat-link" href="#mes-plateformes">
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

    if (badgesRoot) {
        badgesRoot.innerHTML = `
        ${sharedStyle}
        <div class="hm-badges-panel">
            <div class="hm-badges-scroll">
                <div class="hm-badges-row">
                    ${badges.map((badge) => `
                        <a
                          class="hm-badge-link"
                          href="${badge.href}"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="${badge.alt}"
                        >
                          <img
                            class="hm-badge-img"
                            src="./${badge.src}"
                            alt="${badge.alt}"
                            loading="lazy"
                          >
                        </a>
                    `).join("")}
                </div>
            </div>
        </div>
        `;
    }

    if (heatmapRoot) {
        heatmapRoot.innerHTML = `
        ${sharedStyle}

        <div class="hm-top-grid">
          <div class="hm-heatmap-panel">
            <div class="hm-heatmap-block">
              <div class="hm-heatmap-scroll" tabindex="0" aria-label="Heatmap scrollable horizontalement">
                <div class="hm-heatmap-inner">
                  <div style="position:relative;height:16px;width:${totalWidth}px;margin-bottom:4px">${monthHeader}</div>
                  <div style="position:relative;width:${totalWidth}px;height:${gridH}px">${dayLabels}${cells}</div>
                </div>
              </div>

              <div class="hm-legend-row">
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

                <div class="hm-milestone-legend">
                  <span class="hm-milestone-key">
                    <span class="hm-milestone-letter">S</span>
                    <span>Création du site</span>
                  </span>
                  <span class="hm-milestone-key">
                    <span class="hm-milestone-letter">H</span>
                    <span>Ajout de la heatmap</span>
                  </span>
                </div>

                <div class="hm-streak-inline">
                  <span class="hm-streak-mini" title="Série actuelle">
                    <span class="hm-streak-mini-label">Série</span>
                    <strong class="hm-streak-mini-value">${currentStreak}j</strong>
                  </span>
                  <span class="hm-streak-mini-label"> · </span>
                  <span class="hm-streak-mini" title="Meilleure série">
                    <span class="hm-streak-mini-label">Record</span>
                    <strong class="hm-streak-mini-value">${longestStreak}j</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="hm-detail" id="hm-detail">
            <div class="hm-detail-sticky">
              <span class="hm-date">Détail</span>
            </div>
            <div class="hm-detail-body">
              <em>Clique sur un jour pour voir les activités</em>
            </div>
          </div>
        </div>

        <div class="hm-below-grid">
          <aside class="hm-recent-panel">
            <span class="hm-recent-title">Activités récentes</span>
            <div class="hm-recent-list">
              ${recentActivitiesHtml}
            </div>
          </aside>
        </div>

        <div class="hm-summary">
            <span class="hm-date">Compteurs globaux</span>

            <div class="hm-summary-block">
                <div class="hm-summary-title">Activités</div>
                ${renderHorizontalSegments(activitySegments, totalActivities, "Aucune activité")}
            </div>

            <div class="hm-summary-block">
                <div class="hm-summary-title">RESOLVE par plateforme</div>
                ${renderPlatformSegments(allResolvePlatforms)}
            </div>

            <div class="hm-summary-block">
                <div class="hm-summary-title">RETEX par plateforme</div>
                ${renderPlatformSegments(allRetexPlatforms)}
            </div>

            ${globalLegendHtml}
        </div>
        `;

        const scrollEl = heatmapRoot.querySelector(".hm-heatmap-scroll");

        if (scrollEl) {
            requestAnimationFrame(() => {
                scrollEl.scrollLeft = Math.max(0, scrollEl.scrollWidth - scrollEl.clientWidth);
            });

            scrollEl.addEventListener("wheel", (event) => {
                if (scrollEl.scrollWidth <= scrollEl.clientWidth) return;

                const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX)
                    ? event.deltaY
                    : event.deltaX;

                if (delta === 0) return;

                const maxScrollLeft = scrollEl.scrollWidth - scrollEl.clientWidth;
                const next = Math.max(0, Math.min(maxScrollLeft, scrollEl.scrollLeft + delta));

                event.preventDefault();
                event.stopPropagation();

                scrollEl.scrollLeft = next;
            }, { passive: false, capture: true });

            scrollEl.addEventListener("keydown", (event) => {
                const step = 60;
                if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    scrollEl.scrollLeft -= step;
                } else if (event.key === "ArrowRight") {
                    event.preventDefault();
                    scrollEl.scrollLeft += step;
                } else if (event.key === "Home") {
                    event.preventDefault();
                    scrollEl.scrollLeft = 0;
                } else if (event.key === "End") {
                    event.preventDefault();
                    scrollEl.scrollLeft = scrollEl.scrollWidth;
                }
            });
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
                detail.innerHTML = `
                    <div class="hm-detail-sticky">
                        <span class="hm-date">${date}</span>
                    </div>
                    <div class="hm-detail-body">
                        <em>Aucune activité enregistrée.</em>
                    </div>
                `;
                return;
            }

            const items = d.activités.map(colorize).join("");
            const milestoneText = el.dataset.markerLabel
                ? `<div style="margin-top:.55rem;color:var(--hm-accent-soft);font-size:.9rem;font-weight:600">${el.dataset.marker} — ${el.dataset.markerLabel}</div>`
                : "";

            detail.innerHTML = `
                <div class="hm-detail-sticky">
                    <span class="hm-date">${date}</span>
                    <span class="hm-count">${count} activité${count > 1 ? "s" : ""}</span>
                </div>
                <div class="hm-detail-body">
                    <ul>${items}</ul>
                    ${milestoneText}
                </div>
            `;
        });
    });
};

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("nav", init);