const init = async () => {
    const heatmapRoot = document.getElementById("heatmap-root");
    const statsRoot = document.getElementById("site-stats-root");
    const badgesRoot = document.getElementById("badges-root");
    const ctfStatsRoot = document.getElementById("stats-ctf");
    if (!heatmapRoot && !statsRoot && !badgesRoot && !ctfStatsRoot) return;

    const base = document.querySelector('meta[name="base-url"]')?.content || "";

    // Les liens "Voir mes profils" / "Voir mes badges" des stat cards doivent
    // toujours pointer vers les sections de la page Journal d'activité. Sur
    // la page heatmap elle-même, un simple ancre suffit ; ailleurs (ex: la
    // homepage, où site-stats-root est aussi affiché), il faut d'abord
    // naviguer vers la page heatmap avant de scroller jusqu'à l'ancre.
    const onHeatmapPage = document.body?.dataset?.slug === "heatmap";
    const heatmapAnchor = (anchor) => (onHeatmapPage ? `#${anchor}` : `./heatmap#${anchor}`);

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

    const ctfPeriods = data.__ctf_periods__ || [];

    const findCtfPeriod = (date) =>
        ctfPeriods.find(p => date >= p.start && date <= p.end);

    const META_KEYS = new Set(["__totaux__", "__badges__", "__assets__", "__ctf_periods__"]);
    const isMetaKey = (date) => META_KEYS.has(date);

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
            src: "Badges/TL_ES.png",
            href: "https://factory.cancred.ca/obv3/credentials/249b5350a4dbfa610e76e5fd83b3588a8c865ab0",
            alt: "OSINT: Educational Series",
        },
        {
            src: "Badges/TL_PSP.png",
            href: "https://factory.cancred.ca/obv3/credentials/77dcfcb86747bd62696283faee0858afa56740d7",
            alt: "Participant - Global OSINT Search Party CTF",
        },
        {
            src: "Badges/TL_PO-2026.png",
            href: "https://factory.cancred.ca/obv3/credentials/79e7c0bc1f1e03c39703f952120c33772c975339",
            alt: "OSINT Search Party Participant Orientation - 2026",
        },
        {
            src: "Badges/OP_CULOT_PF.png",
            href: "https://badgify.eu/api/v1/ob2/assertions/3265b962-1965-4a10-a8a9-459d48bdd263",
            alt: "Opération Culot 2026 – Finisher",
        },
        {
            src: "Badges/OP_CULOT_PP.png",
            href: "https://badgify.eu/api/v1/ob2/assertions/60fb45ae-572d-41c2-9cec-c4d306e74645",
            alt: "Opération Culot 2026 – Participant présentiel",
        },
        {
            src: "Badges/OP_CULOT_P.png",
            href: "https://badgify.eu/api/v1/ob2/assertions/98420593-f8c5-4d97-a183-6b732a725424",
            alt: "Opération Culot 2026 – Participant",
        },
        {
            src: "Badges/badge-a284b2b9eaf3b6ff.png",
            href: "https://www.badgeforge.eu/verify/a284b2b9eaf3b6ff1ed870c61f5d2b065eaee724f7726165099a599e88b2fae8",
            alt: "CTF Tacosint - L'appel de la forêt - Badge finisher",
        },
        {
            src: "Badges/badge-6208beaf12143c0e.png",
            href: "https://www.badgeforge.eu/verify/6208beaf12143c0e2f43cb46dccca030d5755bdc5126eaf898abc6a9d7e36db4",
            alt: "CTF Tacosint - L'appel de la forêt - Badge survivor",
        },
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
            src: "Badges/badge-d67f944edce42d8d.png",
            href: "https://www.badgeforge.eu/verify/d67f944edce42d8d02685508f05a3085f7d0160571d7b7be3e7941b373616996",
            alt: "CANELEA 2025-FINISHER",
        },
        {
            src: "Badges/AOO2025.png",
            href: "https://www.badgeforge.eu/verify/c53f517cb3204c6ddc7b2043f824cb15cd120581cb240b047c6f09da2b0a1024",
            alt: "Advent Of OSINT 2025-FINISHER",
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


    // Résultats CTF : l'ordre ci-dessous est l'ordre d'affichage (du plus récent au
    // plus ancien, à toi de ranger). Une entrée avec "special: true" s'affiche en
    // grande carte (ex : Trace Labs, enquête réelle) à sa place dans la liste :
    //   { special: true, name, date, solo, badge, desc, imgSrc, href }
    const ctfResults = [
        {
            special: true,
            name: "Trace Labs Search Party",
            date: "Octobre 2026",
            solo: false,
            badge: "Enquête réelle · Personnes disparues",
            desc: "Participation à une enquête OSINT sur des cas réels de personnes disparues.<br> Objectif : recueillir et documenter des informations publiques susceptibles d'aider les autorités dans leurs recherches.",
            note: "L'objectif : contribuer, pas se classer.",
            imgSrc: "Logo_CTF/TL_banner.webp",
            href: "/Toolbox/TraceLabs"
        },
        {
            name: "Opération Culot ",
            date: "Octobre 2026",
            position: 10,
            total: 315,
            solo: false,
            href: "/Notes/Opération-Culot/Opération-Culot",
            accent: "#f5b700",
            note: "7ᵉ SpeedRun & 8ᵉ Final no fail",
            logoSrc: "Logo_CTF/L_OPC.png"
        },
        {
            name: "DeepThreats",
            date: "Septembre 2026",
            position: 49,
            total: 489,
            solo: false,
            href: "/Notes/DeepThreats/DeepThreats",
            accent: "#ff6b2b",
            note: "",
            logoSrc: "Logo_CTF/L_DT.png",
        },
        {
            name: "L'appel de la forêt",
            date: "Juillet 2026",
            position: 22,
            total: 202,
            solo: false,
            href: "/Notes/L'appel-de-la-forêt/L'appel-de-la-forêt",
            accent: "#ff6b2b",
            note: "Parmis 30 équipes FINISHER",
            logoSrc: "Logo_CTF/L_AF.png",
        },
        {
            name: "Le Caire nid d'espions",
            date: "Juin 2026",
            position: 29,
            total: 112,
            solo: false,
            href: "/Notes/Le-Caire-nid-d'espions/Le-Caire-nid-d'espions",
            accent: "#9b928b",
            note: "Duo vs Squad",
            logoSrc: "Logo_CTF/L_LCS.png",
        },
        {
            name: "Medileak 3",
            date: "Mai 2026",
            position: 17,
            total: 186,
            solo: false,
            href: "/Skg-Notes/Medileak-3/Medileak-3",
            accent: "#ff6b2b",
            note: "Parmis 36 équipes FINISHER",
            logoSrc: "Logo_CTF/L_M3.png",
        },
        {
            name: "Bleuet V5",
            date: "Mai 2026",
            position: 18,
            total: 220,
            solo: false,
            href: "/Notes/Bleuet-de-France-V5/Bleuet-de-France-V5",
            accent: "#ff6b2b",
            note: "Solo vs Squad : 10ᵉ meilleur joueur.",
            logoSrc: "Logo_CTF/L_BV5.png",
        },
        {
            name: "Bellatrix",
            date: "Mars 2026",
            position: 82,
            total: 1006,
            solo: true,
            href: "/Notes/Bellatrix-Orion-26/Bellatrix-Orion-26",
            accent: "#ff6b2b",
            note: "",
            logoSrc: "Logo_CTF/L_BO.png",
        },
    ];

    const getCtfRankColor = (position, total) => {
        if (!position || !total) return "var(--hm-muted)";
        const percentile = position / total;
        if (position <= 3) return "#e24b0f";
        if (percentile <= 0.10) return "#fd8235";
        if (percentile <= 0.30) return "#c49a6c";
        return "var(--hm-muted)";
    };

    const getCtfProgress = (position, total) => {
        if (!position || !total) return 0;
        return Math.max(4, Math.min(100, 100 - getCtfTopPercent(position, total)));
    };

    const getCtfTopPercent = (position, total) => {
        if (!position || !total) return null;
        return Math.ceil((position / total) * 100);
    };

    const formatOrdinal = (n) => {
        if (n === 1) return "1er";
        return `${n}ᵉ`;
    };

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
        .filter(date => !isMetaKey(date))
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
                <div class="hm-recent-top">
                    <div class="hm-recent-tags">
                        <span class="hm-recent-badge" style="background:color-mix(in srgb, ${item.typeColor} 16%, transparent);color:${item.typeColor}">${item.typeLabel}</span>
                        <span class="hm-recent-platform" style="--dot-color:${item.typeColor}">${item.platform}</span>
                    </div>
                    <span class="hm-recent-date">${item.date}</span>
                </div>
                <div class="hm-recent-name">${item.name}</div>
            </div>
        `).join("")
        : `<div class="hm-recent-empty">Aucune activité récente</div>`;

    const recentRetex = Object.keys(data)
        .filter(date => !isMetaKey(date))
        .sort((a, b) => new Date(b) - new Date(a))
        .flatMap(date => {
            const day = data[date];
            if (!day?.activités) return [];
            return day.activités
                .filter(activity => extractType(activity) === "Retex")
                .map(activity => ({
                    date,
                    type: "Retex",
                    typeLabel: "RETEX",
                    typeColor: ACTIVITY_COLORS.Retex,
                    name: extractName(activity),
                    platform: extractPlatform(activity),
                }));
        })
        .slice(0, 6);

    const recentRetexHtml = recentRetex.length
        ? recentRetex.map(item => `
            <div class="hm-recent-item">
                <div class="hm-recent-top">
                    <div class="hm-recent-tags">
                        <span class="hm-recent-badge" style="background:color-mix(in srgb, ${item.typeColor} 16%, transparent);color:${item.typeColor}">${item.typeLabel}</span>
                        <span class="hm-recent-platform" style="--dot-color:${item.typeColor}">${item.platform}</span>
                    </div>
                    <span class="hm-recent-date">${item.date}</span>
                </div>
                <div class="hm-recent-name">${item.name}</div>
            </div>
        `).join("")
        : `<div class="hm-recent-empty">Aucun RETEX récent</div>`;

    const recentResolve = Object.keys(data)
        .filter(date => !isMetaKey(date))
        .sort((a, b) => new Date(b) - new Date(a))
        .flatMap(date => {
            const day = data[date];
            if (!day?.activités) return [];
            return day.activités
                .filter(activity => extractType(activity) === "Resolve")
                .map(activity => ({
                    date,
                    type: "Resolve",
                    typeLabel: "RESOLVED",
                    typeColor: ACTIVITY_COLORS.Resolve,
                    name: extractName(activity),
                    platform: extractPlatform(activity),
                }));
        })
        .slice(0, 6);

    const recentResolveHtml = recentResolve.length
        ? recentResolve.map(item => `
            <div class="hm-recent-item">
                <div class="hm-recent-top">
                    <div class="hm-recent-tags">
                        <span class="hm-recent-badge" style="background:color-mix(in srgb, ${item.typeColor} 16%, transparent);color:${item.typeColor}">${item.typeLabel}</span>
                        <span class="hm-recent-platform" style="--dot-color:${item.typeColor}">${item.platform}</span>
                    </div>
                    <span class="hm-recent-date">${item.date}</span>
                </div>
                <div class="hm-recent-name">${item.name}</div>
            </div>
        `).join("")
        : `<div class="hm-recent-empty">Aucun Resolved récent</div>`;

    const platformCounts = { retex: {}, resolve: {} };
    Object.keys(data).forEach(date => {
        if (isMetaKey(date)) return;
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

    const platformColors = ["#4ecdc4", "#ff6b6b", "#45b7d1", "#feca57", "#96ceb4",
    "#a78bfa", "#ff9ff3", "#34d399", "#f472b6", "#60a5fa",
    "#fb923c", "#facc15", "#2dd4bf", "#c084fc", "#f87171",
    "#38bdf8", "#a3e635", "#fbbf24", "#e879f9", "#22d3ee"];

    // Certains noms de plateforme dans le journal sont des raccourcis du nom
    // officiel utilisé dans ctf_periods.json (ex: "BleuetV5" pour "Bleuet de
    // France V5"). Cette table fait le lien pour savoir quels points du
    // scatter plot représentent un CTF ponctuel (losange) plutôt qu'une
    // plateforme récurrente.
    const CTF_PLATFORM_ALIASES = {
        "BleuetV5": "Bleuet de France V5",
        "404CTF26": "404 CTF 2026",
    };

    const ctfPeriodNames = new Set(ctfPeriods.map(p => p.name));
    const isCtfPlatform = (platform) =>
        ctfPeriodNames.has(platform) || ctfPeriodNames.has(CTF_PLATFORM_ALIASES[platform]);

    const allPlatforms = [...new Set([...allRetexPlatforms.map(p => p[0]), ...allResolvePlatforms.map(p => p[0])])];

    // Deux pools de couleurs indépendants (CTF ponctuels / plateformes
    // classiques) : une couleur peut donc être réutilisée d'une catégorie à
    // l'autre (le losange fait déjà la distinction), sans jamais se répéter
    // à l'intérieur d'une même catégorie avant d'avoir dépassé 20 entrées.
    const platformToColor = new Map();
    let ctfColorIndex = 0;
    let classicColorIndex = 0;
    allPlatforms.forEach((platform) => {
        if (isCtfPlatform(platform)) {
            platformToColor.set(platform, platformColors[ctfColorIndex % platformColors.length]);
            ctfColorIndex += 1;
        } else {
            platformToColor.set(platform, platformColors[classicColorIndex % platformColors.length]);
            classicColorIndex += 1;
        }
    });

    const scatterPoints = allPlatforms.map((platform) => ({
        platform,
        retex: platformCounts.retex[platform] || 0,
        resolve: platformCounts.resolve[platform] || 0,
        color: platformToColor.get(platform),
        isCtf: isCtfPlatform(platform),
    }));

    const roundUpToNext10 = (value) => {
        return Math.max(10, Math.ceil((value + 1) / 10) * 10);
    };

    // Plateformes très éloignées du reste (grand vide dans les valeurs de RESOLVED) :
    // l'axe s'arrête avant elles et elles sont montrées par une flèche au bord droit,
    // pour ne pas écraser toutes les autres plateformes dans la moitié gauche.
    const sortedResolves = [...new Set(scatterPoints.map((item) => item.resolve))].sort((a, b) => a - b);
    let resolveCap = sortedResolves.length ? sortedResolves[sortedResolves.length - 1] : 0;
    for (let i = 1; i < sortedResolves.length; i++) {
        const gap = sortedResolves[i] - sortedResolves[i - 1];
        if (gap > 25 && gap > 0.4 * sortedResolves[i - 1]) {
            resolveCap = sortedResolves[i - 1];
            break;
        }
    }
    const maxScatterX = roundUpToNext10(resolveCap);
    const outlierPoints = scatterPoints.filter((item) => item.resolve > maxScatterX);
    const inlierPoints = scatterPoints.filter((item) => item.resolve <= maxScatterX);
    const maxScatterY = roundUpToNext10(Math.max(0, ...scatterPoints.map((item) => item.retex)));

    const buildScatterTicks = (max) => {
        const step = Math.max(10, max / 5);
        return Array.from({ length: 6 }, (_, i) => Math.round(i * step));
    };

    const scatterXTicks = buildScatterTicks(maxScatterX);
    const scatterYTicks = buildScatterTicks(maxScatterY);

    // Les noms des plateformes sont masqués par défaut (bouton pour les afficher).
    let showScatterLabels = false;
    // Plateforme isolée via la légende (son nom est alors affiché sur le graphique).
    let selectedScatterPlatform = null;

    // widthHint : largeur disponible en px. Le graphique est dessiné à cette largeur
    // (1 unité du viewBox = 1 px à l'écran), avec une version compacte sur mobile
    // pour que les étiquettes restent lisibles sans défilement horizontal.
    const renderScatterPlot = (widthHint = 900) => {
        if (!scatterPoints.length) {
            return `<div class="hm-hbar-empty">Aucune donnée</div>`;
        }

        const width = Math.max(280, Math.min(900, Math.floor(widthHint)));
        const compact = width < 560;
        const height = compact ? Math.round(width * 1.75) : Math.round(width * 0.56);

           const padding = compact
            ? { top: 30, right: 22, bottom: 74, left: 42 }
            : { top: 42, right: 42, bottom: 72, left: 72 };
        const dotRadius = compact ? 6 : 8;

           const innerWidth = width - padding.left - padding.right;
        const innerHeight = height - padding.top - padding.bottom;

           const xToPx = value =>
            padding.left + (value / maxScatterX) * innerWidth;

           const yToPx = value =>
            height - padding.bottom - (value / maxScatterY) * innerHeight;

           const verticalGrid = scatterXTicks.map(tick => {
            const x = xToPx(tick);

               return `
                <line
                    x1="${x}"
                    y1="${padding.top}"
                    x2="${x}"
                    y2="${height - padding.bottom}"
                    class="hm-scatter-grid-line"
                ></line>

                   <text
                    x="${x}"
                    y="${height - padding.bottom + (compact ? 18 : 34)}"
                    text-anchor="middle"
                    class="hm-scatter-tick"
                >${tick}</text>
            `;
        }).join("");

           const horizontalGrid = scatterYTicks.map(tick => {
            const y = yToPx(tick);

               return `
                <line
                    x1="${padding.left}"
                    y1="${y}"
                    x2="${width - padding.right}"
                    y2="${y}"
                    class="hm-scatter-grid-line"
                ></line>

                   <text
                    x="${padding.left - (compact ? 8 : 14)}"
                    y="${y + 4}"
                    text-anchor="end"
                    class="hm-scatter-tick"
                >${tick}</text>
            `;
        }).join("");

           const diagonalMax = Math.min(maxScatterX, maxScatterY);

           const diagonal = `
            <line
                x1="${xToPx(0)}"
                y1="${yToPx(0)}"
                x2="${xToPx(diagonalMax)}"
                y2="${yToPx(diagonalMax)}"
                class="hm-scatter-diagonal"
            ></line>

               <text
                x="${xToPx(diagonalMax)}"
                y="${yToPx(diagonalMax) - 14}"
                text-anchor="end"
                class="hm-scatter-diagonal-label"
            >
                RETEX = RESOLVED
            </text>
        `;
        // Points sharing the exact same coordinates render as a single circle.
        const coordinateGroups = new Map();

        inlierPoints.forEach(item => {
            const key = `${item.resolve}:${item.retex}`;

                if (!coordinateGroups.has(key)) {
                coordinateGroups.set(key, []);
            }

                coordinateGroups.get(key).push(item);
        });

        const circleGroups = [...coordinateGroups.values()].map(group => ({
            platforms: group,
            x: xToPx(group[0].resolve),
            y: yToPx(group[0].retex),
        }));

        // Each dot keeps its own label (dots stay individually readable even
        // when close together). We only avoid text collisions: every label
        // starts at its default spot (to the right of its dot), and if it would
        // overlap a label already placed, it gets nudged up/down or flipped to
        // the other side. Whenever a label ends up away from its default spot,
        // a thin leader line reconnects it to its dot so it stays traceable.
        const LABEL_LINE_HEIGHT = 13;
        const LABEL_CHAR_WIDTH = compact ? 4.5 : 5.1;

        // Position des flèches « hors cadre » calculée en amont : leurs étiquettes
        // servent d'obstacles au placement des autres noms.
        const OUT_ARROW_LENGTH = compact ? 32 : 46;
        const OUT_MIN_GAP = 32;
        const outlierYs = [];
        const outlierLayout = outlierPoints
            .slice()
            .sort((a, b) => b.retex - a.retex)
            .map((item) => {
                let y = yToPx(item.retex) - (item.retex === 0 ? 16 : 0);
                const previous = outlierYs[outlierYs.length - 1];
                if (previous !== undefined && Math.abs(previous - y) < OUT_MIN_GAP) {
                    y = previous - OUT_MIN_GAP;
                }
                y = Math.max(y, padding.top + 14);
                outlierYs.push(y);
                const xEnd = width - padding.right - 10;
                const text = `${item.platform} (${item.resolve}, ${item.retex})`;
                const w = text.length * LABEL_CHAR_WIDTH + 24;
                return { item, y, xEnd, text, box: { x: xEnd - 6 - w, y: y - 9, w: w + 6, h: 18 } };
            });

        const labelCandidates = circleGroups
            .map((group, index) => {
                const names = group.platforms
                    .filter((p) => compact ? true : (p.resolve > 7 || p.retex > 7))
                    .map((p) => p.platform);

                if (!names.length) return null;
                // Sur mobile, les plateformes importantes sont placées en premier (les autres
                // se rangent autour) ; tous les noms s'affichent avec le bouton.
                const minor = compact && !group.platforms.some((p) => p.resolve >= 45 || p.retex >= 30);
                const crowd = circleGroups.filter(
                    (other) => other !== group && Math.hypot(other.x - group.x, other.y - group.y) < 70
                ).length;
                return { group, index, names, minor, crowd };
            })
            .filter(Boolean);

        const labelWidth = (names) => Math.max(...names.map((n) => n.length)) * LABEL_CHAR_WIDTH;
        const labelHeight = (names) => names.length * LABEL_LINE_HEIGHT;

        const boxesOverlap = (a, b) =>
            !(a.x + a.w + 3 < b.x || b.x + b.w + 3 < a.x || a.y + a.h < b.y || b.y + b.h < a.y);

        // Zone autorisée : l'intérieur du repère (jamais sur les axes ni sous l'axe X).
        const bounds = {
            xMin: padding.left + 4,
            xMax: width - padding.right - 2,
            yMin: padding.top + 2,
            yMax: yToPx(0) - 4,
        };
        const inBounds = (box) =>
            box.x >= bounds.xMin && box.x + box.w <= bounds.xMax &&
            box.y >= bounds.yMin && box.y + box.h <= bounds.yMax;

        // Chaque point est un obstacle pour les étiquettes des autres points.
        const DOT_CLEARANCE = dotRadius + 2;
        const dotBoxes = circleGroups.map((group) => ({
            x: group.x - DOT_CLEARANCE,
            y: group.y - DOT_CLEARANCE,
            w: DOT_CLEARANCE * 2,
            h: DOT_CLEARANCE * 2,
        }));
        const fixedBoxes = outlierLayout.map((o) => o.box);

        // Positions possibles autour d'un point, de la plus proche à la plus lointaine.
        // Les anneaux 1 et 2 éloignent l'étiquette (un trait la relie alors au point).
        const buildOptions = (group, names) => {
            const w = labelWidth(names);
            const h = labelHeight(names);
            const out = [];
            [0, 1, 2, 3, 4, 5, 6, 7].forEach((ring) => {
                const d = dotRadius + 4 + ring * 13;
                const k = ring * 10;
                const diag = d * 0.75;
                const mk = (anchor, dx, dy, cost) => {
                    const x = anchor === "start" ? group.x + dx : anchor === "end" ? group.x + dx - w : group.x + dx - w / 2;
                    out.push({ anchor, dx, dy, cost: cost + k, ring, box: { x, y: group.y + dy - h / 2, w, h } });
                };
                // Près du point : sans trait. Plus loin : uniquement à la verticale ou à
                // l'horizontale du point, pour que le trait reste droit et lisible.
                if (ring === 0) {
                    mk("start", d, 0, 0);
                    mk("middle", 0, -(d + h / 2 - 3), 1);
                    mk("end", -d, 0, 1.5);
                    mk("start", diag, -(diag + h / 2 - 4), 1.2);
                    mk("end", -diag, -(diag + h / 2 - 4), 1.7);
                    mk("middle", 0, d + h / 2 + 3, 2);
                    mk("start", diag, diag + h / 2 + 2, 2.2);
                    mk("end", -diag, diag + h / 2 + 2, 2.7);
                    mk("start", d, -LABEL_LINE_HEIGHT, 3);
                    mk("start", d, LABEL_LINE_HEIGHT, 3.2);
                    mk("end", -d, -LABEL_LINE_HEIGHT, 3.4);
                    mk("end", -d, LABEL_LINE_HEIGHT, 3.6);
                } else {
                    mk("middle", 0, -(d + h / 2 - 3), 0);
                    mk("middle", 0, d + h / 2 + 3, 0.5);
                    mk("start", d, 0, 1);
                    mk("end", -d, 0, 1.5);
                    // Dernier recours : décalé sur le côté (trait légèrement oblique).
                    mk("start", -6, -(d + h / 2 - 3), 6);
                    mk("end", 6, -(d + h / 2 - 3), 6.2);
                    mk("start", -6, d + h / 2 + 3, 6.5);
                    mk("end", 6, d + h / 2 + 3, 6.7);
                }
            });
            return out;
        };

        // Placement glouton, essayé dans plusieurs ordres (tirages déterministes) :
        // on garde l'agencement dont le coût total est le plus faible.
        const runPlacement = (order) => {
            const placedList = [];
            let total = 0;
            order.forEach((candidate) => {
                const options = candidate.options || (candidate.options = buildOptions(candidate.group, candidate.names));
                let best = null;
                options.forEach((option) => {
                    const hits =
                        placedList.filter((other) => boxesOverlap(option.box, other.box)).length +
                        dotBoxes.filter((dotBox, i) => i !== candidate.index && boxesOverlap(option.box, dotBox)).length +
                        fixedBoxes.filter((fixed) => boxesOverlap(option.box, fixed)).length;
                    const score = (inBounds(option.box) ? 0 : 1000) + hits * 100 + option.cost;
                    if (!best || score < best.score) best = { option, score };
                });
                total += best.score;
                placedList.push({ candidate, choice: best.option, box: best.option.box });
            });
            return { placedList, total };
        };

        const baseOrder = labelCandidates
            .slice()
            .sort((a, b) => (a.minor - b.minor) || (b.crowd - a.crowd) || (a.group.x - b.group.x));
        let bestRun = runPlacement(baseOrder);
        let seed = 12345;
        const rand = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
        for (let attempt = 0; attempt < 150 && bestRun.total >= 100; attempt++) {
            const order = baseOrder.slice();
            for (let i = order.length - 1; i > 0; i--) {
                const j = Math.floor(rand() * (i + 1));
                [order[i], order[j]] = [order[j], order[i]];
            }
            const run = runPlacement(order);
            if (run.total < bestRun.total) bestRun = run;
        }

        const placed = bestRun.placedList.map(({ candidate, choice }) => {
            candidate.choice = choice;
            return candidate;
        });

        const labelMarkupByGroup = new Map();
        placed.forEach((candidate) => {
            const { group, names, choice } = candidate;
            const { anchor, dx, dy, box, ring } = choice;
            const anchorX = group.x + dx;
            const lineCount = names.length;

            const text = names
                .map((name, index) => {
                    const lineY =
                        group.y +
                        dy -
                        ((lineCount - 1) * LABEL_LINE_HEIGHT) / 2 +
                        index * LABEL_LINE_HEIGHT;

                    return `
                        <text
                            x="${choice.rot ? group.x : anchorX}"
                            y="${choice.rot ? group.y + choice.dy : lineY + 3}"
                            ${choice.rot ? `transform="rotate(-90 ${group.x} ${group.y + choice.dy}) translate(0 3)"` : ""}
                            text-anchor="${anchor}"
                            class="hm-scatter-label${candidate.minor ? " hm-scatter-label-minor" : ""}"
                        >
                            ${name}
                        </text>
                    `;
                })
                .join("");

            let leader = "";
            if (ring > 0) {
                const tx = Math.min(Math.max(group.x, box.x), box.x + box.w);
                const ty = Math.min(Math.max(group.y, box.y), box.y + box.h);
                const len = Math.hypot(tx - group.x, ty - group.y) || 1;
                const x1 = group.x + ((tx - group.x) / len) * (dotRadius + 1);
                const y1 = group.y + ((ty - group.y) / len) * (dotRadius + 1);
                leader = `
                        <line
                            x1="${x1}"
                            y1="${y1}"
                            x2="${tx}"
                            y2="${ty}"
                            class="hm-scatter-leader${candidate.minor ? " hm-scatter-label-minor" : ""}"
                        ></line>
                    `;
            }

            labelMarkupByGroup.set(group, `${leader}${text}`);
        });

        const CTF_DIAMOND_SIZE = compact ? 5 : 7;

        const points = circleGroups.map((group) => {
            const { x, y, platforms } = group;
            const labels = labelMarkupByGroup.get(group) ?? "";
            const isCtf = platforms.some(p => p.isCtf);

            const diamond = isCtf ? `
                <rect
                    x="${x - CTF_DIAMOND_SIZE / 2}"
                    y="${y - CTF_DIAMOND_SIZE / 2}"
                    width="${CTF_DIAMOND_SIZE}"
                    height="${CTF_DIAMOND_SIZE}"
                    transform="rotate(45 ${x} ${y})"
                    class="hm-scatter-ctf-diamond"
                    pointer-events="none"
                ></rect>
            ` : "";

            return `
                <g class="hm-scatter-point-group${selectedScatterPlatform ? (platforms.some(p => p.platform === selectedScatterPlatform) ? " hm-scatter-selected" : " hm-scatter-dimmed") : ""}" data-platforms="${platforms.map(p => p.platform).join("|")}">
                    <circle
                        cx="${x}"
                        cy="${y}"
                        r="${dotRadius}"
                        fill="${platforms[0].color}"
                        class="hm-scatter-point"
                    >
                        <title>${platforms.map(g => g.platform).join(", ")} (${platforms[0].resolve}, ${platforms[0].retex})${isCtf ? " — CTF" : ""}</title>
                    </circle>

                        ${diamond}
                        ${labels}
                </g>
            `;
        }).join("");

        // Flèches au bord droit pour les plateformes hors cadre. Un point à 0 RETEX
        // est remonté au-dessus de l'axe, et les flèches trop proches s'empilent.
        const outlierMarkup = outlierLayout
            .map(({ item, y, xEnd, text }) => {
                const xStart = xEnd - OUT_ARROW_LENGTH;
                return `
                <g class="hm-scatter-point-group${selectedScatterPlatform ? (item.platform === selectedScatterPlatform ? " hm-scatter-selected" : " hm-scatter-dimmed") : ""}" data-platforms="${item.platform}">
                    <title>${item.platform} (${item.resolve}, ${item.retex}) : hors du cadre</title>
                    <path
                        d="M ${xEnd - 11} ${y - 5} L ${xEnd - 6} ${y} L ${xEnd - 11} ${y + 5} M ${xEnd - 5} ${y - 5} L ${xEnd} ${y} L ${xEnd - 5} ${y + 5}"
                        fill="none"
                        stroke="${item.color}"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <text x="${xEnd - 18}" y="${y + 4}" text-anchor="end" class="hm-scatter-label hm-scatter-label-out">${text}</text>
                </g>
                `;
            }).join("");

        // Bulle d'infos (nom + stats) pour la plateforme sélectionnée par un clic.
        let calloutMarkup = "";
        if (selectedScatterPlatform) {
            const inGroup = circleGroups.find((g) => g.platforms.some((p) => p.platform === selectedScatterPlatform));
            const inOut = outlierLayout.find((o) => o.item.platform === selectedScatterPlatform);
            const target = inGroup
                ? { x: inGroup.x, y: inGroup.y, names: inGroup.platforms.map((p) => p.platform), resolve: inGroup.platforms[0].resolve, retex: inGroup.platforms[0].retex, r: dotRadius }
                : inOut
                    ? { x: inOut.xEnd - 5, y: inOut.y, names: [inOut.item.platform], resolve: inOut.item.resolve, retex: inOut.item.retex, r: 8 }
                    : null;
            if (target) {
                const CALLOUT_LINE = compact ? 12 : 14;
                const CHAR = compact ? 5 : 5.6;
                const lines = [
                    ...target.names.map((n) => ({ text: n, strong: true })),
                    { text: `RESOLVED : ${target.resolve}` },
                    { text: `RETEX : ${target.retex}` },
                ];
                const boxW = Math.ceil(Math.max(...lines.map((l) => l.text.length)) * CHAR) + 18;
                const boxH = lines.length * CALLOUT_LINE + 10;
                let bx = target.x + target.r + 8;
                let by = target.y - boxH - target.r - 4;
                if (bx + boxW > width - 4) bx = target.x - target.r - 8 - boxW;
                if (bx < 4) bx = 4;
                if (by < 4) by = target.y + target.r + 6;
                if (by + boxH > height - 4) by = height - 4 - boxH;
                calloutMarkup = `
                    <g class="hm-scatter-callout" pointer-events="none">
                        <rect x="${bx}" y="${by}" width="${boxW}" height="${boxH}" rx="7" class="hm-scatter-callout-box"></rect>
                        ${lines.map((l, i) => `
                            <text x="${bx + 9}" y="${by + 5 + (i + 1) * CALLOUT_LINE - 3}" class="hm-scatter-callout-text${l.strong ? " hm-scatter-callout-name" : ""}">${l.text}</text>
                        `).join("")}
                    </g>
                `;
            }
        }

                   return `
            <div class="hm-scatter-wrap${showScatterLabels ? " hm-scatter-show-labels" : ""}" data-w="${width}">

                   <svg
                    viewBox="0 0 ${width} ${height}"
                    class="hm-scatter-svg${compact ? " hm-scatter-compact" : ""}"
                    role="img"
                    aria-label="Graphique RESOLVED en abscisse et RETEX en ordonnée par plateforme"
                >
                    ${verticalGrid}
                    ${horizontalGrid}
                    ${diagonal}

                       <line
                        x1="${padding.left}"
                        y1="${height - padding.bottom}"
                        x2="${width - padding.right}"
                        y2="${height - padding.bottom}"
                        class="hm-scatter-axis"
                    ></line>

                       <line
                        x1="${padding.left}"
                        y1="${padding.top}"
                        x2="${padding.left}"
                        y2="${height - padding.bottom}"
                        class="hm-scatter-axis"
                    ></line>

                       ${points}
                       ${outlierMarkup}

                       <text
                        x="${padding.left + innerWidth / 2}"
                        y="${height - 6}"
                        text-anchor="middle"
                        class="hm-scatter-axis-label"
                    >
                        RESOLVED
                    </text>

                       <text
                        x="${compact ? 10 : 18}"
                        y="${padding.top + innerHeight / 2}"
                        text-anchor="middle"
                        class="hm-scatter-axis-label"
                        transform="rotate(-90 ${compact ? 10 : 18} ${padding.top + innerHeight / 2})"
                    >
                        RETEX
                    </text>
                    ${calloutMarkup}
                </svg>
            </div>
        `;
    };
    const renderScatterLegend = () => {
        if (!scatterPoints.length) return "";
        const ctfCount = scatterPoints.filter(p => p.isCtf).length;
        const ctfPlatforms = scatterPoints.filter(p => p.isCtf);
        const classicPlatforms = scatterPoints.filter(p => !p.isCtf);

        const renderLegendItems = (items) => items.map(item => `
            <div class="hm-scatter-legend-item hm-scatter-legend-clickable" data-platform="${item.platform}" role="button" tabindex="0">
                <span class="hm-scatter-legend-marker">
                    <span
                        class="hm-scatter-legend-dot"
                        style="background:${item.color}"
                    ></span>
                    ${item.isCtf ? `<span class="hm-scatter-legend-diamond"></span>` : ""}
                </span>

                   <span>${item.platform}</span>
            </div>
        `).join("");

           return `
            <div class="hm-scatter-legend-wrap">
                ${ctfCount ? `
                <div class="hm-scatter-legend-hint-row">
                    <div class="hm-scatter-legend-item hm-scatter-legend-hint">
                        <span class="hm-scatter-legend-marker">
                            <span class="hm-scatter-legend-dot" style="background:var(--hm-muted)"></span>
                            <span class="hm-scatter-legend-diamond"></span>
                        </span>
                        <span>= CTF ponctuel</span>
                    </div>
                    <div class="hm-scatter-legend-item hm-scatter-legend-hint">
                        <span class="hm-scatter-legend-marker">
                            <span class="hm-scatter-legend-dot" style="background:var(--hm-muted)"></span>
                        </span>
                        <span>= Plateforme de challenge classique</span>
                    </div>
                </div>
                ` : ""}
                <details class="hm-scatter-legend">
                    <summary class="hm-scatter-legend-summary">
                        <span>Plateformes (${scatterPoints.length})</span>
                        <span class="hm-scatter-legend-chevron" aria-hidden="true">▾</span>
                    </summary>
                    <div class="hm-scatter-legend-items">
                        ${ctfPlatforms.length ? `
                        <div class="hm-scatter-legend-group">
                            <span class="hm-scatter-legend-group-label">CTF ponctuels (${ctfPlatforms.length})</span>
                            <div class="hm-scatter-legend-group-items">
                                ${renderLegendItems(ctfPlatforms)}
                            </div>
                        </div>
                        ` : ""}
                        ${classicPlatforms.length ? `
                        <div class="hm-scatter-legend-group">
                            <span class="hm-scatter-legend-group-label">Plateformes classiques (${classicPlatforms.length})</span>
                            <div class="hm-scatter-legend-group-items">
                                ${renderLegendItems(classicPlatforms)}
                            </div>
                        </div>
                        ` : ""}
                    </div>
                </details>
            </div>
        `;
    };

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
    const currentYear = today.getFullYear();

    // Séries calculées sur tout l'historique (elles traversent le 31 décembre).
    const allActiveDates = Object.keys(data)
        .filter((d) => !isMetaKey(d) && (data[d]?.count || 0) > 0 && d <= todayStr)
        .sort();
    const activeDates = new Set(allActiveDates);

    const longestRun = (dates) => {
        let best = 0;
        let run = 0;
        let prev = null;
        for (const date of dates) {
            run = prev && getPreviousDate(date) === prev ? run + 1 : 1;
            if (run > best) best = run;
            prev = date;
        }
        return best;
    };

    let currentStreak = 0;
    let streakAnchor = todayStr;

    while (activeDates.has(streakAnchor)) {
        currentStreak += 1;
        streakAnchor = getPreviousDate(streakAnchor);
    }

    const longestStreak = longestRun(allActiveDates);

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

    // Périodes affichables : 12 derniers mois glissants, ou une année civile.
    const dataYears = [...new Set(allActiveDates.map((d) => d.slice(0, 4)))];
    const heatmapYears = [...new Set([...dataYears, String(currentYear)])].sort().reverse();
    let heatmapView = "roll";
    let bilanOpen = false;

    const buildHeatmap = (view) => {
        let start;
        let end;
        if (view === "roll") {
            end = new Date(today);
            start = new Date(today);
            start.setFullYear(start.getFullYear() - 1);
            start.setDate(start.getDate() + 1);
        } else {
            start = new Date(Number(view), 0, 1);
            end = new Date(Number(view), 11, 31);
        }
        const endStr = formatLocalDate(end) < todayStr ? formatLocalDate(end) : todayStr;

        const days = [];
        const cursor = new Date(start);
        while (formatLocalDate(cursor) <= endStr) {
            days.push(formatLocalDate(cursor));
            cursor.setDate(cursor.getDate() + 1);
        }

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

            return { date, col, row, month, monthKey: date.slice(0, 7) };
        });

        const colToPx = (c) => c * step;

        const monthBounds = {};
        dayInfo.forEach(({ monthKey, month, col }) => {
            if (!(monthKey in monthBounds)) {
                monthBounds[monthKey] = { min: col, max: col, month };
            } else {
                monthBounds[monthKey].min = Math.min(monthBounds[monthKey].min, col);
                monthBounds[monthKey].max = Math.max(monthBounds[monthKey].max, col);
            }
        });

        const maxCol = Math.max(...dayInfo.map((d) => d.col));
        const totalWidth = LABEL_W + colToPx(maxCol) + CELL + 10;
        const gridH = 7 * step;

        const monthKeys = Object.keys(monthBounds);
        const monthHeader = monthKeys.map((key, idx) => {
            const { min, max, month } = monthBounds[key];
            const startX = LABEL_W + colToPx(min);
            const endX = LABEL_W + colToPx(max) + CELL;
            const centerX = (startX + endX) / 2;
            // Sur 12 mois glissants, l'année s'ajoute au premier mois et à chaque janvier.
            const label = MOIS[month] + (view === "roll" && (idx === 0 || month === 0) ? ` ${key.slice(2, 4)}` : "");
            return `<div style="position:absolute;left:${centerX}px;transform:translateX(-50%);font-size:10px;color:var(--hm-muted);white-space:nowrap;pointer-events:none">${label}</div>`;
        }).join("");

        const cells = dayInfo.map(({ date, col, row }) => {
            const d = data[date];
            const count = d?.count || 0;
            const cx = LABEL_W + colToPx(col);
            const cy = row * step;
            const milestone = milestones[date];
            const ctfPeriod = findCtfPeriod(date);

            return `<div class="hm-day${milestone ? " hm-day-milestone" : ""}${ctfPeriod ? " hm-day-ctf" : ""}"
            style="position:absolute;left:${cx}px;top:${cy}px;background:${color(count)}"
            data-date="${date}"
            data-count="${count}"
            ${milestone ? `data-marker="${milestone.marker}" data-marker-label="${milestone.label}"` : ""}
            title="${date} — ${count} activité(s)${milestone ? ` — ${milestone.label}` : ""}${ctfPeriod ? ` — CTF : ${ctfPeriod.name}` : ""}"
        ></div>`;
        }).join("");

        const dayLabels = JOURS.map((label, i) => {
            if (!JOURS_A_AFFICHER.has(i)) return "";
            const y = i * step + 2;
            return `<div style="position:absolute;top:${y}px;left:0;width:${LABEL_W - 4}px;font-size:10px;color:var(--hm-muted);text-align:right">${label}</div>`;
        }).join("");

        return {
            totalWidth,
            html: `
                  <div style="position:relative;height:16px;width:${totalWidth}px;margin-bottom:4px">${monthHeader}</div>
                  <div style="position:relative;width:${totalWidth}px;height:${gridH}px">${dayLabels}${cells}</div>`,
        };
    };

    const heatmapToolbarHtml = () => `
              <div class="hm-year-toolbar" role="group" aria-label="Période de la heatmap">
                <button type="button" class="hm-year-chip" data-hm-view="roll" aria-pressed="${heatmapView === "roll"}">12 derniers mois</button>
                ${heatmapYears.map((y) => `<button type="button" class="hm-year-chip" data-hm-view="${y}" aria-pressed="${heatmapView === y}">${y}</button>`).join("")}
              </div>`;

    // Bilan d'une année : caché tant qu'on n'a pas cliqué sur le bouton.
    const yearSummary = (y) => {
        let resolve = 0;
        let retex = 0;
        const yearDates = allActiveDates.filter((d) => d.startsWith(`${y}-`));
        yearDates.forEach((d) => {
            resolve += data[d]?.stats?.resolve || 0;
            retex += data[d]?.stats?.retex || 0;
        });
        const ctfCount = ctfResults.filter((c) => !c.special && String(c.date || "").includes(y)).length;
        const partyCount = ctfResults.filter((c) => c.special && String(c.date || "").includes(y)).length;
        return { resolve, retex, activeDays: yearDates.length, bestStreak: longestRun(yearDates), ctfCount, partyCount };
    };

    const heatmapBilanButtonHtml = () => {
        if (heatmapView === "roll") return "";
        const y = heatmapView;
        return `<button type="button" class="hm-bilan-btn" data-hm-bilan aria-expanded="${bilanOpen}">${bilanOpen ? `Masquer le bilan ${y}` : `Voir le bilan ${y}`}</button>`;
    };

    const heatmapBilanPanelHtml = () => {
        if (heatmapView === "roll" || !bilanOpen) return "";
        const y = heatmapView;
        const sum = yearSummary(y);
        const lifetime = data.__totaux__ || { resolve: 0, retex: 0 };
        const items = [
            { value: sum.resolve, label: "Résolus", sub: `${lifetime.resolve} au total` },
            { value: sum.retex, label: "RETEX publiés", sub: `${lifetime.retex} au total` },
            { value: sum.activeDays, label: "Jours actifs", sub: "" },
            { value: `${sum.bestStreak} j`, label: "Meilleure série", sub: "" },
            {
                value: sum.ctfCount,
                label: "CTF",
                sub: sum.partyCount ? `+ ${sum.partyCount} Search Part${sum.partyCount > 1 ? "ies" : "y"}` : "",
            },
        ];
        return `
              <div class="hm-bilan" role="region" aria-label="Bilan ${y}">
                <div class="hm-bilan-title">Bilan ${y}</div>
                <div class="hm-bilan-grid">
                  ${items.map((it) => `
                  <div class="hm-bilan-item">
                    <strong>${it.value}</strong>
                    <span>${it.label}</span>
                    ${it.sub ? `<em>${it.sub}</em>` : ""}
                  </div>`).join("")}
                </div>
              </div>`;
    };

    const initialHeatmap = buildHeatmap(heatmapView);

    const updateHeatmapView = () => {
        const inner = heatmapRoot?.querySelector("#hm-heatmap-inner");
        if (!inner) return;
        const built = buildHeatmap(heatmapView);
        inner.style.width = `${built.totalWidth}px`;
        inner.style.minWidth = `${built.totalWidth}px`;
        inner.innerHTML = built.html;
        heatmapRoot.querySelector("#hm-year-toolbar-slot").innerHTML = heatmapToolbarHtml();
        heatmapRoot.querySelector("#hm-bilan-btn-slot").innerHTML = heatmapBilanButtonHtml();
        heatmapRoot.querySelector("#hm-bilan-slot").innerHTML = heatmapBilanPanelHtml();
        const scroller = heatmapRoot.querySelector(".hm-heatmap-scroll");
        if (scroller) {
            const toEnd = heatmapView === "roll" || heatmapView === String(currentYear);
            scroller.scrollLeft = toEnd ? Math.max(0, scroller.scrollWidth - scroller.clientWidth) : 0;
        }
    };

    const colorize = (text) => {
        const keywords = {
            Resolve: "#c49a6c",
            Retex: "#fd8235",
            Created: "#9FE1CB",
        };
        const labels = {
            Resolve: "RESOLVED",
            Retex: "RETEX",
            Created: "CREATED",
        };
        const dashIdx = text.indexOf(" — ");
        if (dashIdx === -1) return `<li class="hm-detail-item"><div class="hm-detail-item-name">${text}</div></li>`;
        const keyword = text.slice(0, dashIdx);
        const rest = text.slice(dashIdx + 3);
        const keywordColor = keywords[keyword];
        if (!keywordColor) return `<li class="hm-detail-item"><div class="hm-detail-item-name">${text}</div></li>`;
        const parts = rest.split(" · ");
        const name = parts[0];
        const context = parts.length > 1 ? parts[parts.length - 1] : "";
        const label = labels[keyword] || keyword.toUpperCase();
        return `<li class="hm-detail-item">
            <div class="hm-detail-item-top">
                <span class="hm-detail-badge" style="background:color-mix(in srgb, ${keywordColor} 16%, transparent);color:${keywordColor}">${label}</span>
                ${context ? `<span class="hm-detail-platform" style="--dot-color:${keywordColor}">${context}</span>` : ""}
            </div>
            <div class="hm-detail-item-name">${name}</div>
        </li>`;
    };

    const totals = data.__totaux__ || { resolve: 0, retex: 0, autre: 0 };
    const assets = data.__assets__ || { profils: 0, badges: 0 };

    const totalActivities = totals.resolve + totals.retex + totals.autre;

    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
    let monthResolve = 0;
    let monthRetex = 0;

    Object.keys(data).forEach(date => {
        if (isMetaKey(date)) return;
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
          #heatmap-root, #site-stats-root, #badges-root, #stats-ctf {
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
          #heatmap-root, #site-stats-root, #badges-root, #stats-ctf {
            --hm-empty: #5c5b5b;
            --hm-border: rgba(150, 150, 150, 0.2);
            --hm-text: #ebebec;
            --hm-muted: #a29a95;
            --hm-active: #c4845a;
            --hm-card-bg: rgba(17, 19, 23, 0.72);
            --hm-accent: #ff8a3d;
            --hm-accent-soft: #ff9b5c;
          }
        }

        #heatmap-root, #site-stats-root, #badges-root, #stats-ctf { font-family: inherit; }
        #site-stats-root, #stats-ctf { margin-bottom: 1.2rem; }

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
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .hm-stat-link {
            display: inline-block;
            text-decoration: none;
            transition: color .14s ease, text-decoration-color .14s ease;
        }

        .hm-stat-link:hover {
            text-decoration: underline;
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
          color: var(--hm-text);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .hm-badges-scroll {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 0;
        }

        /* Barre de défilement dessinée en HTML : toujours visible, quel que soit le navigateur */
        .hm-badges-scroll {
          scrollbar-width: none;
        }

        .hm-badges-scroll::-webkit-scrollbar {
          display: none;
        }

        /* Zone cliquable de 16 px ; seule la ligne fine centrale est dessinée. */
        .hm-badges-track {
          position: relative;
          height: 16px;
          margin: -0.1rem 0 0.3rem;
          cursor: pointer;
        }

        .hm-badges-track::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 6px;
          height: 4px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--hm-muted) 10%, transparent);
        }

        .hm-badges-track[hidden] {
          display: none;
        }

        .hm-badges-thumb {
          position: absolute;
          top: 6px;
          left: 0;
          height: 4px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--hm-muted) 35%, transparent);
          cursor: grab;
          transition: background .15s ease;
        }

        /* Hitbox de la poignée = toute la hauteur de la zone cliquable */
        .hm-badges-thumb::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -6px;
          bottom: -6px;
        }

        .hm-badges-track:hover .hm-badges-thumb {
          background: color-mix(in srgb, var(--hm-muted) 65%, transparent);
        }

        .hm-badges-thumb:hover,
        .hm-badges-thumb.is-dragging {
          background: #fd8235;
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
          margin: 0.6rem 0 0.3rem;
          height: 54px;
          width: auto;
          border-radius: 8px;
          transition: transform .12s ease, opacity .12s ease;
        }

        .hm-badge-link:hover .hm-badge-img {
          transform: translateY(-1px);
          opacity: 0.92;
        }
        

        .hm-ctf-panel {
            container-type: inline-size;
            container-name: ctf-panel;

                padding: 1.55rem;
            border: 1px solid var(--hm-border);
            border-radius: 18px;
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
        }

        .hm-ctf-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            margin-bottom: 1.35rem;
        }

        .hm-ctf-heading {
            display: flex;
            align-items: center;
            gap: 0.9rem;
        }

        .hm-ctf-icon {
            width: 46px;
            height: 46px;
            display: grid;
            place-items: center;
            border-radius: 14px;
            color: var(--hm-accent);
            background: color-mix(in srgb, var(--hm-accent) 13%, transparent);
            font-size: 1.45rem;
        }

        .hm-ctf-title {
            display: block;
            font-size: 1.25rem;
            font-weight: 850;
            color: #fff;
            line-height: 1.2;
        }

        .hm-ctf-subtitle {
            display: block;
            margin-top: 0.25rem;
            font-size: 0.92rem;
        }

        .hm-ctf-count {
            padding: 0.45rem 0.85rem;
            border-radius: 999px;
            background: color-mix(in srgb, var(--hm-accent) 18%, transparent);
            font-size: 0.86rem;
            font-weight: 700;
            white-space: nowrap;
        }

        .hm-featured {
            position: relative;
            overflow: hidden;
            margin: 0;
            border: 1px solid #1f5c52;
            border-radius: 16px;
            background: #07100f;
            min-height: 190px;
        }
        .hm-featured-img {
            position: absolute;
            top: 0;
            right: 0;
            width: 62%;
            height: 100%;
            object-fit: cover;
            object-position: center 55%;
            margin: 0;
            border-radius: 0;
            cursor: default;
            pointer-events: none;
            -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 55%);
            mask-image: linear-gradient(to right, transparent 0%, #000 55%);
        }
        .hm-featured-text {
            position: relative;
            z-index: 1;
            max-width: 58%;
            padding: 1.5rem 1.7rem;
        }
        .hm-featured-badge {
            display: inline-block;
            padding: 0.2rem 0.75rem;
            border-radius: 999px;
            background: #12382f;
            color: #5dcaa5;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
        }
        .hm-featured-name {
            margin: 0.7rem 0 0.2rem;
            font-size: 1.5rem;
            font-weight: 700;
            line-height: 1.15;
            color: #f5f2ee;
        }
        .hm-featured-name a {
            color: inherit;
            text-decoration: none;
        }
        .hm-featured-meta {
            font-size: 0.82rem;
            color: #9fb5ae;
        }
        .hm-featured-note {
            display: flex;
            align-items: center;
            gap: 0.45rem;
            margin-top: 0.9rem;
            font-size: 0.84rem;
            font-weight: 600;
            color: #5dcaa5;
        }
        .hm-featured-desc {
            margin: 0.8rem 0 0;
            font-size: 0.86rem;
            line-height: 1.6;
            color: #b9c8c2;
        }
        @media (max-width: 700px) {
            .hm-featured-text { max-width: 100%; }
            .hm-featured-img { width: 100%; opacity: 0.35; }
        }

        .hm-ctf-list {
            display: grid;
            gap: 1rem;
        }

        .hm-ctf-card {
            position: relative;
            display: grid;
            grid-template-columns: 84px minmax(0, 1.25fr) 140px minmax(180px, 1fr);
            gap: 1.1rem;
            align-items: center;
            padding: 1.1rem 1.25rem;
            border: 1px solid var(--lightgray);
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.025);
            overflow: hidden;
        }

        .hm-ctf-card::before {
            content: "";
            position: absolute;
            left: 0;
            top: 12px;
            bottom: 12px;
            width: 4px;
            border-radius: 999px;
            background: var(--ctf-accent);
        }

        .hm-ctf-logo {
            width: 82px;
            height: 82px;
            border-radius: 16px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

            .hm-ctf-logo img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            display: block;
        }

        .hm-ctf-name {
            font-size: 1.2rem;
            font-weight: 850;
            line-height: 1.2;
            color: #fff;
        }

        .hm-ctf-link {
            text-decoration: none;
        }

        .hm-ctf-link:hover {
            color: var(--ctf-accent);
            text-decoration: underline;
        }

        .hm-ctf-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
            margin-top: 0.55rem;
            font-size: 0.88rem;
        }

        .hm-ctf-top {
            display: inline-flex;
            margin-top: 0.75rem;
            padding: 0.32rem 0.7rem;
            border-radius: 999px;
            color: var(--ctf-accent);
            background: color-mix(in srgb, var(--ctf-accent) 17%, transparent);
            font-weight: 800;
            font-size: 0.86rem;
        }

        .hm-ctf-rank-block {
            border-left: 1px solid var(--lightgray);
            padding-left: 1.1rem;
        }

        .hm-ctf-rank-label,
            .hm-ctf-progress-label {
            font-size: 0.9rem;
            margin-bottom: 0.35rem;
        }

        .hm-ctf-rank-value {
            color: var(--ctf-accent);
            font-size: 2.25rem;
            font-weight: 900;
            line-height: 1;
        }

        .hm-ctf-rank-total {
            margin-top: 0.35rem;
            font-size: 0.95rem;
        }

        .hm-ctf-progress-block {
            border-left: 1px solid var(--lightgray);
            padding-left: 1.1rem;
        }

        .hm-ctf-progress-top {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 1rem;
        }

        .hm-ctf-progress-percent {
            color: var(--ctf-accent);
            font-weight: 900;
            font-size: 1rem;
        }

        .hm-ctf-progress {
            height: 13px;
            margin-top: 0.75rem;
            border-radius: 999px;
            overflow: hidden;
            background: rgba(150, 150, 150, 0.2);
        }

        .hm-ctf-progress-fill {
            height: 100%;
            border-radius: inherit;
            background: var(--ctf-accent);
        }

        .hm-ctf-progress-caption {
            margin-top: 0.6rem;
            font-size: 0.86rem;
        }
        
        .hm-ctf-card > div {
            min-width: 0;
        }

        .hm-ctf-name,
        .hm-ctf-link {
            overflow-wrap: normal;
            word-break: normal;
            hyphens: none;
        }

            /* Quand la section CTF devient trop étroite */
        @container ctf-panel (max-width: 640px) {
            .hm-ctf-card {
                grid-template-columns: 84px minmax(150px, 1fr) minmax(130px, auto);
                align-items: center;
            }

            .hm-ctf-progress-block {
                grid-column: 1 / -1;
                border-left: none;
                padding-left: 0;
            }
        }

            /* Très petite largeur */
        @container ctf-panel (max-width: 460px) {
            /* Carte compacte : logo, nom et classement sur une ligne, barre dessous */
            .hm-ctf-card {
                grid-template-columns: 56px minmax(0, 1fr) auto;
                gap: 0.7rem 0.85rem;
                padding: 0.9rem 1rem 0.9rem 1.15rem;
            }

            .hm-ctf-rank-block {
                border-left: none;
                padding-left: 0;
                text-align: right;
            }

            .hm-ctf-rank-label {
                display: none;
            }

            .hm-ctf-rank-value {
                font-size: 1.6rem;
                line-height: 1;
            }

            .hm-ctf-rank-total {
                font-size: 0.7rem;
            }

            .hm-ctf-progress-block {
                grid-column: 1 / -1;
            }

            .hm-ctf-logo {
                width: 56px;
                height: 56px;
                border-radius: 12px;
            }

            .hm-ctf-header {
                align-items: flex-start;
                flex-direction: column;
            }
        }
        
        @media (max-width: 980px) {
            .hm-scatter-explanations {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 560px) {
            .hm-ctf-panel {
                padding: 1rem;
            }

                .hm-ctf-header {
                align-items: flex-start;
                flex-direction: column;
            }
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
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .hm-recent-panel {
          padding: 1rem 1rem;
          border: 1px solid var(--hm-border);
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          min-width: 0;
        }

        .hm-recent-title {
            display: block;
            font-size: 1.05rem;
            font-weight: 700;
            margin-bottom: 0.85rem;
        }

        .hm-recent-toggle {
            display: inline-flex;
            gap: 0.4rem;
            margin-bottom: 0.85rem;
        }

        .hm-recent-toggle-btn {
            font: inherit;
            cursor: pointer;
            padding: 0.32rem 0.85rem;
            border-radius: 999px;
            border: 1px solid var(--hm-border);
            background: transparent;
            color: var(--hm-muted);
            font-size: 0.82rem;
            font-weight: 700;
            letter-spacing: 0.02em;
            transition: background .14s ease, color .14s ease, border-color .14s ease;
        }

        .hm-recent-toggle-btn:hover {
            color: var(--btn-color, var(--hm-text));
            border-color: var(--btn-color, var(--hm-accent-soft));
        }

        .hm-recent-toggle-btn.active {
            color: var(--btn-color, var(--hm-accent));
            border-color: var(--btn-color, var(--hm-accent));
            background: color-mix(in srgb, var(--btn-color, var(--hm-accent)) 14%, transparent);
        }

        .hm-recent-list {
          display: flex;
          flex-direction: column;
          gap: 0.72rem;
        }

        .hm-recent-item {
          padding-bottom: 0.72rem;
          border-bottom: 1px solid var(--lightgray);
        }

        .hm-recent-item:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }

        .hm-recent-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.6rem;
            margin-bottom: 0.42rem;
            flex-wrap: wrap;
        }

        .hm-recent-tags {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            flex-wrap: wrap;
        }

        .hm-recent-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.03em;
            white-space: nowrap;
            line-height: 1.3;
        }

        .hm-recent-date {
            font-size: 0.76rem;
            color: var(--hm-muted);
            white-space: nowrap;
        }

        .hm-recent-name {
            font-size: 0.87rem;
            font-weight: 500;
            color: var(--hm-muted);
            line-height: 1.3;
            margin-bottom: 0;
            word-break: break-word;
        }

        .hm-recent-platform {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.8rem;
            color: var(--hm-muted);
            line-height: 1.25;
            word-break: break-word;
        }

            .hm-recent-platform::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--dot-color, var(--hm-muted));
            flex-shrink: 0;
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

        .hm-year-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 0.7rem;
        }

        .hm-year-chip,
        .hm-bilan-btn {
          cursor: pointer;
          padding: 0.25rem 0.8rem;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--hm-muted) 35%, transparent);
          background: transparent;
          color: var(--hm-muted);
          font: inherit;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .hm-year-chip:hover,
        .hm-bilan-btn:hover,
        .hm-year-chip[aria-pressed="true"],
        .hm-bilan-btn[aria-expanded="true"] {
          border-color: #fd8235;
          color: #fd8235;
        }

        .hm-bilan-btn {
          margin-top: 0.8rem;
        }

        .hm-bilan {
          container-type: inline-size;
          margin: 0.8rem 0 1.4rem;
          padding: 0.9rem 1rem;
          border: 1px solid var(--hm-border);
          border-radius: 12px;
        }

        .hm-bilan-title {
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 0.7rem;
        }

        .hm-bilan-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 0.5rem;
        }

        /* Panneau étroit : 2 colonnes, le cinquième bloc prend toute la largeur (pas d'orphelin). */
        @container (max-width: 440px) {
          .hm-bilan-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hm-bilan-item:last-child {
            grid-column: 1 / -1;
          }
        }

        .hm-bilan-item {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          padding: 0.6rem 0.65rem;
          min-width: 0;
          border-radius: 8px;
          background: color-mix(in srgb, var(--hm-muted) 9%, transparent);
        }

        .hm-bilan-item strong {
          font-size: 1.25rem;
          color: #fd8235;
          line-height: 1.2;
        }

        .hm-bilan-item span {
          font-size: 0.78rem;
          font-weight: 600;
        }

        .hm-bilan-item em {
          font-size: 0.72rem;
          font-style: normal;
          color: var(--hm-muted);
        }

        .hm-heatmap-inner {
          display: inline-block;
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

        .hm-day-ctf::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: ${Math.round(CELL * 0.46)}px;
          height: ${Math.round(CELL * 0.46)}px;
          background: var(--light);
          outline: 1px solid var(--hm-border);
          outline-offset: -1px;
          transform: translate(-50%, -50%) rotate(45deg);
          pointer-events: none;
        }

        .hm-detail, .hm-summary {
            border: 1px solid var(--lightgray);
            border-radius: 8px;
        }
        
        .hm-summary {
               padding: 1rem 1.2rem;
        }

        .hm-detail {
            min-width: 0;
            width: 100%;
            max-width: 290px;
            height: 0;
            min-height: max(100%, 220px);
            max-height: none;
            margin-top: 0;
            padding: 0;
            box-sizing: border-box;
            align-self: stretch;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }  

        .hm-detail-sticky {
            flex: 0 0 auto;
            position: static;
            z-index: 3;
            padding: 0.85rem 1.2rem 0.7rem 1.2rem;
            margin: 0;
            border-bottom: 1px solid var(--lightgray);
        }

        .hm-detail-body {
            flex: 1 1 auto;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: thin;
            padding: 0.7rem 1.2rem 1rem 1.2rem;
        }

        .hm-summary {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .hm-detail em { color: var(--hm-muted); }

        .hm-detail ul {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
        }

        .hm-detail-item {
            padding-bottom: 0.65rem;
            border-bottom: 1px solid var(--lightgray);
        }

        .hm-detail-item:last-child {
            padding-bottom: 0;
            border-bottom: none;
        }

        .hm-detail-item-top {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            flex-wrap: wrap;
            margin-bottom: 0.5rem !important;
        }

        .hm-detail-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.16rem 0.5rem;
            border-radius: 999px;
            font-size: 0.64rem;
            font-weight: 700;
            letter-spacing: 0.03em;
            white-space: nowrap;
            line-height: 1.3;
        }

        .hm-detail-platform {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.74rem;
            color: var(--hm-muted);
            line-height: 1.2;
            word-break: break-word;
        }

        .hm-detail-platform::before {
            content: "";
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: var(--dot-color, var(--hm-muted));
            flex-shrink: 0;
        }

        .hm-detail-item-name {
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--hm-muted);
            line-height: 1.3;
            word-break: break-word;
        }

        .hm-date { font-weight: 700; font-size: 1.05rem; }
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

        .hm-ctf-diamond {
          display: inline-block;
          width: ${Math.round(CELL * 0.6)}px;
          height: ${Math.round(CELL * 0.6)}px;
          background: var(--light);
          outline: 1px solid var(--hm-border);
          outline-offset: -1px;
          transform: rotate(45deg);
          flex-shrink: 0;
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
        
        .hm-scatter-wrap {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 0.35rem;
        }

        .hm-scatter-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .hm-scatter-toolbar {
          display: flex;
          justify-content: flex-end;
          margin: 0.4rem 0 0.2rem;
        }

        .hm-scatter-labels-btn {
          cursor: pointer;
          padding: 0.3rem 0.85rem;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--hm-muted) 35%, transparent);
          background: transparent;
          color: inherit;
          font: inherit;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .hm-scatter-labels-btn:hover,
        .hm-scatter-labels-btn[aria-pressed="true"] {
          border-color: #fd8235;
          color: #fd8235;
        }

        .hm-scatter-wrap:not(.hm-scatter-show-labels) .hm-scatter-label,
        .hm-scatter-wrap:not(.hm-scatter-show-labels) .hm-scatter-leader {
          display: none;
        }

        .hm-scatter-wrap .hm-scatter-point-group.hm-scatter-selected .hm-scatter-label,
        .hm-scatter-wrap .hm-scatter-point-group.hm-scatter-selected .hm-scatter-leader {
          display: inline !important;
        }

        .hm-scatter-compact .hm-scatter-label {
          font-size: 8.5px;
        }

        .hm-scatter-grid-line {
          stroke: color-mix(in srgb, var(--hm-muted) 18%, transparent);
          stroke-width: 1;
          shape-rendering: crispEdges;
        }

        .hm-scatter-axis {
          stroke: var(--hm-border);
          stroke-width: 1.2;
          shape-rendering: crispEdges;
        }

        .hm-scatter-tick {
          fill: var(--hm-muted);
          font-size: 11px;
          font-weight: 600;
        }

        .hm-scatter-axis-label {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .hm-scatter-label {
          font-size: 10px;
          font-weight: 700;
          paint-order: stroke;
          stroke-width: 4px;
          stroke-linejoin: round;
        }

        .hm-scatter-callout-box {
          fill: var(--light, #161618);
          stroke: #fd8235;
          stroke-width: 1.2;
          filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.35));
        }

        .hm-scatter-callout-text {
          fill: var(--hm-text);
          font-size: 10.5px;
          font-weight: 600;
        }

        .hm-scatter-callout-name {
          fill: #fd8235;
          font-weight: 800;
        }

        .hm-scatter-compact .hm-scatter-callout-text {
          font-size: 9px;
        }

        .hm-scatter-point-group {
          cursor: pointer;
        }

        /* Le nom de la plateforme sélectionnée est dans la bulle : on masque son étiquette. */
        .hm-scatter-wrap .hm-scatter-point-group.hm-scatter-selected .hm-scatter-label,
        .hm-scatter-wrap .hm-scatter-point-group.hm-scatter-selected .hm-scatter-leader {
          display: none !important;
        }

        .hm-scatter-leader {
          stroke: var(--hm-muted);
          stroke-width: 1;
          opacity: 0.4;
        }

        .hm-scatter-point {
          stroke: color-mix(in srgb, #ffffff 75%, transparent);
          stroke-width: 1.5;
          transition: transform .12s ease, opacity .12s ease;
        }

        .hm-scatter-point:hover {
          opacity: 0.92;
        }

        .hm-scatter-point-group {
          transition: opacity .15s ease;
        }

        .hm-scatter-point-group.hm-scatter-dimmed {
          opacity: 0.15;
        }

        .hm-scatter-legend-clickable {
          cursor: pointer;
          padding: 2px 6px;
          margin: -2px -6px;
          border-radius: 8px;
          transition: background .12s ease;
        }

        .hm-scatter-legend-clickable:hover {
          background: color-mix(in srgb, var(--hm-accent) 10%, transparent);
        }

        .hm-scatter-legend-clickable.active {
          background: color-mix(in srgb, var(--hm-accent) 16%, transparent);
          color: var(--hm-text);
          font-weight: 700;
        }
        
        .hm-scatter-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .hm-scatter-header-text {
            min-width: 220px;
        }

        .hm-scatter-kpis {
            display: grid;
            grid-template-columns: repeat(3, minmax(145px, 1fr));
            gap: 0.8rem;
            flex: 1 1 540px;
        }

        .hm-scatter-kpi {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.9rem 1rem;
            border: 1px solid var(--hm-border);
            border-radius: 12px;
        }

        .hm-scatter-kpi-dot {
            width: 12px;
            height: 12px;
            border-radius: 999px;
            flex: 0 0 auto;
        }

        .hm-scatter-kpi-value {
            display: block;
            font-size: 1.45rem;
            font-weight: 850;
            line-height: 1;
        }

        .hm-scatter-kpi-label {
            display: block;
            margin-top: 0.3rem;
            font-size: 0.8rem;
            color: var(--hm-muted);
        }

        .hm-scatter-wrap {
            position: relative;
        }

        .hm-scatter-diagonal {
            stroke: color-mix(
                in srgb,
                var(--hm-muted) 65%,
                transparent
            );
            stroke-width: 1.4;
            stroke-dasharray: 7 7;
        }

        .hm-scatter-diagonal-label {
            fill: var(--hm-muted);
            font-size: 11px;
            font-weight: 700;
        }

        .hm-scatter-ctf-diamond {
            fill: var(--light);
            stroke: var(--hm-border);
            stroke-width: 1;
        }

        .hm-scatter-legend-wrap {
            margin-top: 0.9rem;
            padding: 0.7rem 1rem;
            border: 1px solid var(--hm-border);
            border-radius: 12px;
        }

        .hm-scatter-legend[open] {
            padding-bottom: 0.2rem;
        }

        .hm-scatter-legend-summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            cursor: pointer;
            font-size: 0.86rem;
            font-weight: 700;
            list-style: none;
        }

        .hm-scatter-legend-summary::-webkit-details-marker {
            display: none;
        }

        .hm-scatter-legend-chevron {
            color: var(--hm-muted);
            transition: transform .16s ease;
        }

        .hm-scatter-legend[open] .hm-scatter-legend-chevron {
            transform: rotate(180deg);
        }

        .hm-scatter-legend-items {
            display: flex;
            flex-direction: column;
            gap: 0.7rem;
            margin-top: 0.85rem;
        }

        .hm-scatter-legend-group + .hm-scatter-legend-group {
            padding-top: 0.65rem;
            border-top: 1px solid var(--hm-border);
        }

        .hm-scatter-legend-group-label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.7rem;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: var(--hm-muted);
        }

        .hm-scatter-legend-group-items {
            display: flex;
            flex-wrap: wrap;
            gap: 0.65rem 1rem;
        }

        .hm-scatter-legend-item {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            font-size: 0.82rem;
            color: var(--hm-muted);
        }

        .hm-scatter-legend-hint-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.65rem 1.2rem;
            width: 100%;
            padding-bottom: 0.65rem;
            margin-bottom: 0.5rem;
            border-bottom: 1px solid var(--hm-border);
        }

        .hm-scatter-legend-hint-row .hm-scatter-legend-hint {
            padding-bottom: 0;
            border-bottom: none;
        }

        .hm-scatter-legend-hint {
            font-style: italic;
        }

        .hm-scatter-legend-marker {
            position: relative;
            display: inline-flex;
            width: 10px;
            height: 10px;
            flex: 0 0 auto;
        }

        .hm-scatter-legend-dot {
            width: 10px;
            height: 10px;
            border-radius: 999px;
            flex: 0 0 auto;
        }

        .hm-scatter-legend-diamond {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: var(--light);
            outline: 1px solid var(--hm-border);
            outline-offset: -1px;
            transform: translate(-50%, -50%) rotate(45deg);
            pointer-events: none;
        }

        .hm-scatter-explanations {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 0.8rem;
            margin-top: 0.9rem;
        }

        .hm-scatter-explanation {
            padding: 0.9rem 1rem;
            border: 1px solid var(--hm-border);
            border-radius: 12px;
        }

        .hm-scatter-explanation strong {
            display: block;
            margin-bottom: 0.35rem;
            font-size: 0.9rem;
        }

        .hm-scatter-explanation span {
            color: var(--hm-muted);
            font-size: 0.8rem;
            line-height: 1.4;
        }

        .hm-scatter-explanation-list {
            margin: 0;
            padding-left: 0;
            list-style: none;
            color: var(--hm-muted);
            font-size: 0.8rem;
            line-height: 1.4;
        }

        .hm-scatter-explanation-list li {
            position: relative;
            padding-left: 1.1rem;
            color: var(--hm-muted);
        }

        .hm-scatter-explanation-list li + li {
            margin-top: 0.1rem;
        }

        .hm-scatter-explanation-list li::before {
            content: "•";
            position: absolute;
            left: 0.2rem;
            color: var(--hm-muted);
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

          .hm-below-grid {
            grid-template-columns: 1fr;
          }
        
        .hm-scatter-kpis,
        .hm-scatter-explanations {
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

          .hm-detail {
            height: 160px;
            min-height: 160px;
            max-height: 160px;
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
            <div class="hm-stat-card">
                <strong class="hm-stat-value">${activePlatforms}</strong>
                <span class="hm-stat-label">Plateformes actives</span>
                <a class="hm-stat-sub hm-stat-link" href="${heatmapAnchor("mes-plateformes")}">Voir mes profils</a>
            </div>
            <div class="hm-stat-card">
                <strong class="hm-stat-value">${badgeCount}</strong>
                <span class="hm-stat-label">Badges obtenus</span>
                <a class="hm-stat-sub hm-stat-link" href="${heatmapAnchor("mes-badges")}">Voir mes badges</a>
            </div>
        </div>
        `;
    }

    if (badgesRoot) {
        // Bouton « Voir tous mes badges » à droite du titre « Mes Badges ».
        const badgesHeading = document.getElementById("mes-badges");
        if (badgesHeading && !badgesHeading.querySelector(".hm-heading-btn")) {
            const allBadgesLink = document.createElement("a");
            allBadgesLink.className = "hm-heading-btn";
            allBadgesLink.href = "https://decorated.pro/u/skg";
            allBadgesLink.target = "_blank";
            allBadgesLink.rel = "noopener noreferrer";
            allBadgesLink.textContent = "Voir tous mes badges";
            badgesHeading.classList.add("hm-heading-with-btn");
            badgesHeading.appendChild(allBadgesLink);
        }

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
            <div class="hm-badges-track" hidden><div class="hm-badges-thumb"></div></div>
        </div>
        `;

        // Barre de défilement synchronisée avec la rangée de badges.
        const badgesScroll = badgesRoot.querySelector(".hm-badges-scroll");
        const badgesTrack = badgesRoot.querySelector(".hm-badges-track");
        const badgesThumb = badgesRoot.querySelector(".hm-badges-thumb");
        const updateBadgesThumb = () => {
            const overflow = badgesScroll.scrollWidth - badgesScroll.clientWidth;
            if (overflow <= 1) {
                badgesTrack.hidden = true;
                return;
            }
            badgesTrack.hidden = false;
            const trackWidth = badgesTrack.clientWidth;
            const thumbWidth = Math.max(40, (badgesScroll.clientWidth / badgesScroll.scrollWidth) * trackWidth);
            badgesThumb.style.width = `${thumbWidth}px`;
            badgesThumb.style.left = `${(badgesScroll.scrollLeft / overflow) * (trackWidth - thumbWidth)}px`;
        };
        const scrollFromTrack = (clientX, grabOffset) => {
            const rect = badgesTrack.getBoundingClientRect();
            const thumbWidth = badgesThumb.offsetWidth;
            const ratio = (clientX - rect.left - grabOffset) / Math.max(1, rect.width - thumbWidth);
            const overflow = badgesScroll.scrollWidth - badgesScroll.clientWidth;
            badgesScroll.scrollLeft = Math.min(1, Math.max(0, ratio)) * overflow;
        };
        badgesScroll.addEventListener("scroll", updateBadgesThumb, { passive: true });
        badgesScroll.querySelectorAll("img").forEach((img) => img.addEventListener("load", updateBadgesThumb));
        window.addEventListener("resize", updateBadgesThumb);
        if (typeof ResizeObserver !== "undefined") {
            const badgesObserver = new ResizeObserver(updateBadgesThumb);
            badgesObserver.observe(badgesScroll);
            badgesObserver.observe(badgesRoot.querySelector(".hm-badges-row"));
        }
        badgesThumb.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            event.stopPropagation();
            const grabOffset = event.clientX - badgesThumb.getBoundingClientRect().left;
            badgesThumb.classList.add("is-dragging");
            const onMove = (e) => scrollFromTrack(e.clientX, grabOffset);
            const onUp = () => {
                badgesThumb.classList.remove("is-dragging");
                window.removeEventListener("pointermove", onMove);
                window.removeEventListener("pointerup", onUp);
            };
            window.addEventListener("pointermove", onMove);
            window.addEventListener("pointerup", onUp);
        });
        badgesTrack.addEventListener("pointerdown", (event) => {
            if (event.target === badgesThumb) return;
            scrollFromTrack(event.clientX, badgesThumb.offsetWidth / 2);
        });
        updateBadgesThumb();
        requestAnimationFrame(updateBadgesThumb);
    }

    if (ctfStatsRoot) {
        ctfStatsRoot.innerHTML = `
        ${sharedStyle}
        <section class="hm-ctf-panel">
            <div class="hm-ctf-header">
                <div class="hm-ctf-heading">
                    <div>
                        <span class="hm-ctf-subtitle">Aperçu de mes performances sur les CTF récents.</span>
                    </div>
                </div>
                <span class="hm-ctf-count">${ctfResults.filter(c => !c.special).length} CTF${ctfResults.some(c => c.special) ? ` · ${ctfResults.filter(c => c.special).length} Search Part${ctfResults.filter(c => c.special).length > 1 ? "ies" : "y"}` : ""}</span>
            </div>

               <div class="hm-ctf-list">
                ${ctfResults.map(item => {
            if (item.special) {
                return `
                    <article class="hm-featured">
                        <img class="hm-featured-img" src="./${item.imgSrc}" alt="" width="1000" height="808">
                        <div class="hm-featured-text">
                            <span class="hm-featured-badge">${item.badge}</span>
                            <div class="hm-featured-name">${item.href ? `<a href="${item.href}">${item.name}</a>` : item.name}</div>
                            <div class="hm-featured-meta">${item.date} · ${item.solo ? "Solo" : "Équipe"}</div>
                            ${item.desc ? `<p class="hm-featured-desc">${item.desc}</p>` : ""}
                            ${item.note ? `<div class="hm-featured-note"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"/></svg>${item.note}</div>` : ""}
                        </div>
                    </article>`;
            }
            const rankColor = getCtfRankColor(item.position, item.total);
            const accent = item.accent || rankColor;
            const progress = getCtfProgress(item.position, item.total);
            const topPercent = getCtfTopPercent(item.position, item.total);
            const unit = item.solo ? "participants" : "équipes";

            return `
                    <article class="hm-ctf-card" style="--ctf-accent:${accent}">
                        <div class="hm-ctf-logo">
                            ${item.logoSrc
                    ? `<img src="./${item.logoSrc}" alt="${item.name}">`
                    : (item.logo || item.name.slice(0, 2).toUpperCase())
                }
                        </div>

                           <div>
                            <div class="hm-ctf-name">
                                ${item.href ? `<a class="hm-ctf-link" href="${item.href}">${item.name}</a>` : item.name}
                            </div>
                            <div class="hm-ctf-meta">${item.date} · ${item.solo ? "Solo" : "Équipe"}</div>
                            <span class="hm-ctf-top">Top ${topPercent}%</span>
                        </div>

                           <div class="hm-ctf-rank-block">
                            <div class="hm-ctf-rank-label">Classement</div>
                            <div class="hm-ctf-rank-value">${formatOrdinal(item.position)}</div>
                            <div class="hm-ctf-rank-total">sur ${item.total} ${unit}</div>
                        </div>

                           <div class="hm-ctf-progress-block">
                            <div class="hm-ctf-progress-top">
                                <span class="hm-ctf-progress-label">Participants devancés</span>
                                <span class="hm-ctf-progress-percent">${Math.round(progress)}%</span>
                            </div>
                            <div class="hm-ctf-progress">
                                <div class="hm-ctf-progress-fill" style="width:${progress}%"></div>
                            </div>
                            <div class="hm-ctf-progress-caption">${item.note}</div>
                        </div>
                    </article>
                    `;
        }).join("")}
            </div>
        </section>
        `;
    }

    if (heatmapRoot) {
        heatmapRoot.innerHTML = `
        ${sharedStyle}

        <div class="hm-top-grid">
          <div class="hm-heatmap-panel">
            <div class="hm-heatmap-block">
              <div id="hm-year-toolbar-slot">${heatmapToolbarHtml()}</div>
              <div class="hm-heatmap-scroll" tabindex="0" aria-label="Heatmap scrollable horizontalement">
                <div class="hm-heatmap-inner" id="hm-heatmap-inner" style="width:${initialHeatmap.totalWidth}px;min-width:${initialHeatmap.totalWidth}px">
                  ${initialHeatmap.html}
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
                  ${ctfPeriods.length ? `
                  <span class="hm-milestone-key">
                    <span class="hm-ctf-diamond"></span>
                    <span>Période de CTF</span>
                  </span>
                  ` : ""}
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
              <div id="hm-bilan-btn-slot">${heatmapBilanButtonHtml()}</div>
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

        <div id="hm-bilan-slot">${heatmapBilanPanelHtml()}</div>

        <div class="hm-below-grid">
          <aside class="hm-recent-panel">
            <span class="hm-recent-title">Activités récentes</span>
            <div class="hm-recent-list">
              ${recentActivitiesHtml}
            </div>
          </aside>

          <aside class="hm-recent-panel">
            <div class="hm-recent-toggle" role="tablist" aria-label="Filtrer les activités récentes">
              <button type="button" class="hm-recent-toggle-btn active" data-view="retex" style="--btn-color:${ACTIVITY_COLORS.Retex}" role="tab" aria-selected="true">RETEX</button>
              <button type="button" class="hm-recent-toggle-btn" data-view="resolve" style="--btn-color:${ACTIVITY_COLORS.Resolve}" role="tab" aria-selected="false">Resolved</button>
            </div>
            <div class="hm-recent-list" id="hm-recent-toggle-list" data-retex-html="${encodeURIComponent(recentRetexHtml)}" data-resolve-html="${encodeURIComponent(recentResolveHtml)}">
              ${recentRetexHtml}
            </div>
          </aside>
        </div>

        <div class="hm-summary">
            <div class="hm-scatter-header">
                <div class="hm-scatter-header-text">
                    <span class="hm-date">
                        Activité par plateforme
                    </span>

                        <div class="hm-summary-title">
                        Aperçu de mes activités sur différentes plateformes.
                    </div>
                </div>

                    <div class="hm-scatter-kpis">
                    <div class="hm-scatter-kpi">
                        <span
                            class="hm-scatter-kpi-dot"
                            style="background:#c49a6c"
                        ></span>

                            <div>
                            <strong class="hm-scatter-kpi-value">
                                ${totals.resolve}
                            </strong>

                                <span class="hm-scatter-kpi-label">
                                Total RESOLVED
                            </span>
                        </div>
                    </div>

                        <div class="hm-scatter-kpi">
                        <span
                            class="hm-scatter-kpi-dot"
                            style="background:#fd8235"
                        ></span>

                            <div>
                            <strong class="hm-scatter-kpi-value">
                                ${totals.retex}
                            </strong>

                                <span class="hm-scatter-kpi-label">
                                Total RETEX
                            </span>
                        </div>
                    </div>

                        <div class="hm-scatter-kpi">
                        <span
                            class="hm-scatter-kpi-dot"
                            style="background:#9FE1CB"
                        ></span>

                                   <div>
                            <strong class="hm-scatter-kpi-value">
                                ${totals.autre}
                            </strong>

                                       <span class="hm-scatter-kpi-label">
                                Total AUTRE
                            </span>
                        </div>
                    </div>
                </div>
            </div>

                <div class="hm-summary-block">
                <div class="hm-scatter-toolbar">
                    <button type="button" class="hm-scatter-labels-btn" id="hm-scatter-labels-btn" aria-pressed="${showScatterLabels}">
                        ${showScatterLabels ? "Masquer les noms" : "Afficher les noms"}
                    </button>
                </div>
                ${renderScatterPlot(Math.max(280, heatmapRoot.getBoundingClientRect().width - 48))}

                    ${renderScatterLegend()}

                    <div class="hm-scatter-explanations">

                        <div class="hm-scatter-explanation">
                            <strong>Note</strong>
                            <span>
                                Les RETEX ne sont publiés que lorsque la plateforme autorise leur partage.
                                Certaines plateformes (OSINT-FR, Osintopia…) ne sont donc volontairement pas documentées.
                            </span>
                        </div>

                                   <div class="hm-scatter-explanation">
                            <strong>Astuce</strong>
                            <ul class="hm-scatter-explanation-list">
                                <li>Survole un point pour voir ses statistiques.</li>
                                <li>Clique une plateforme dans la légende pour l'isoler sur le graphe.</li>
                            </ul>
                        </div>

                    </div>
            </div>
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

    const scatterLabelsBtn = document.getElementById("hm-scatter-labels-btn");
    if (scatterLabelsBtn) {
        scatterLabelsBtn.addEventListener("click", () => {
            showScatterLabels = !showScatterLabels;
            scatterLabelsBtn.setAttribute("aria-pressed", String(showScatterLabels));
            scatterLabelsBtn.textContent = showScatterLabels ? "Masquer les noms" : "Afficher les noms";
            const wrapEl = document.querySelector(".hm-scatter-wrap");
            if (wrapEl) wrapEl.classList.toggle("hm-scatter-show-labels", showScatterLabels);
        });
    }

    // Le graphique est redessiné quand la largeur disponible change (rotation du téléphone,
    // redimensionnement de la fenêtre), pour rester lisible à toutes les tailles.
    if (heatmapRoot) {
        let lastScatterWidth = 0;
        const refreshScatter = () => {
            const wrapEl = heatmapRoot.querySelector(".hm-scatter-wrap");
            if (!wrapEl) return;
            const available = Math.floor(wrapEl.clientWidth);
            if (!available || Math.abs(available - lastScatterWidth) < 24) return;
            lastScatterWidth = available;
            if (Math.abs(available - Number(wrapEl.dataset.w)) < 24) return;
            wrapEl.outerHTML = renderScatterPlot(available);
        };
        if (window.__hmScatterResize) window.removeEventListener("resize", window.__hmScatterResize);
        window.__hmScatterResize = refreshScatter;
        window.addEventListener("resize", refreshScatter);
        refreshScatter();
    }

    const recentToggleList = document.getElementById("hm-recent-toggle-list");
    if (recentToggleList) {
        document.querySelectorAll(".hm-recent-toggle-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.classList.contains("active")) return;

                document.querySelectorAll(".hm-recent-toggle-btn").forEach(b => {
                    b.classList.remove("active");
                    b.setAttribute("aria-selected", "false");
                });
                btn.classList.add("active");
                btn.setAttribute("aria-selected", "true");

                const key = btn.dataset.view === "resolve" ? "resolveHtml" : "retexHtml";
                recentToggleList.innerHTML = decodeURIComponent(recentToggleList.dataset[key]);
            });
        });
    }

    // Sélection d'une plateforme (clic sur un point ou dans la légende) :
    // le graphique est redessiné avec la bulle d'infos, un second clic la retire.
    const syncScatterLegend = () => {
        document.querySelectorAll(".hm-scatter-legend-clickable").forEach(o => {
            o.classList.toggle("active", o.dataset.platform === selectedScatterPlatform);
        });
    };

    const selectScatterPlatform = (platform) => {
        selectedScatterPlatform = platform && platform !== selectedScatterPlatform ? platform : null;
        const wrapEl = document.querySelector(".hm-scatter-wrap");
        if (wrapEl) {
            wrapEl.outerHTML = renderScatterPlot(Number(wrapEl.dataset.w) || 900);
        }
        syncScatterLegend();
    };

    document.querySelectorAll(".hm-scatter-legend-clickable").forEach(item => {
        item.addEventListener("click", () => selectScatterPlatform(item.dataset.platform));

        item.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                item.click();
            }
        });
    });

    if (heatmapRoot) {
        const onRootClick = (event) => {
            const target = event.target;
            if (!target || !target.closest) return;

            const viewBtn = target.closest("[data-hm-view]");
            if (viewBtn && heatmapRoot.contains(viewBtn)) {
                heatmapView = viewBtn.dataset.hmView;
                bilanOpen = false;
                updateHeatmapView();
                return;
            }

            const bilanBtn = target.closest("[data-hm-bilan]");
            if (bilanBtn && heatmapRoot.contains(bilanBtn)) {
                bilanOpen = !bilanOpen;
                heatmapRoot.querySelector("#hm-bilan-btn-slot").innerHTML = heatmapBilanButtonHtml();
                heatmapRoot.querySelector("#hm-bilan-slot").innerHTML = heatmapBilanPanelHtml();
                return;
            }

            const dayEl = target.closest(".hm-day");
            if (dayEl && heatmapRoot.contains(dayEl)) {
                onDayClick(dayEl);
                return;
            }

            const group = target.closest(".hm-scatter-point-group");
            if (group && heatmapRoot.contains(group)) {
                const platforms = (group.dataset.platforms || "").split("|");
                const current = platforms.includes(selectedScatterPlatform) ? selectedScatterPlatform : platforms[0];
                selectScatterPlatform(current);
                return;
            }
            // Clic dans le vide du graphique : on referme la bulle.
            if (selectedScatterPlatform && target.closest(".hm-scatter-svg")) {
                selectScatterPlatform(selectedScatterPlatform);
            }
        };
        // Un seul écouteur actif, même si init est relancé (navigation Quartz).
        if (heatmapRoot.__hmClick) heatmapRoot.removeEventListener("click", heatmapRoot.__hmClick);
        heatmapRoot.__hmClick = onRootClick;
        heatmapRoot.addEventListener("click", onRootClick);
    }

    const onDayClick = (el) => {
        {
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
        }
    };
};

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("nav", init);