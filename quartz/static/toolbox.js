// Page Toolbox : guides, "J'ai quelque chose, je fais quoi ?" (checklist par
// situation) et annuaire complet. Les données viennent de toolbox.json :
// pour ajouter un outil, il suffit d'ajouter une ligne dans "tools".
const initToolbox = async () => {
    // Bannière : on déplace le titre de la page et la ligne "Last Update"
    // (générés par Quartz au-dessus du contenu) à l'intérieur de la bannière.
    const bannerText = document.getElementById("toolbox-banner-text");
    if (bannerText && !bannerText.dataset.ready) {
        const title = document.querySelector(".article-title");
        const meta = document.querySelector(".content-meta");
        const bar = bannerText.querySelector(".fiches-hero-bar");
        if (title && bar) bar.after(title);
        if (meta) bannerText.append(meta);
        bannerText.dataset.ready = "1";
    }

    const root = document.getElementById("toolbox-root");
    if (!root) return;

    const base = document.querySelector('meta[name="base-url"]')?.content || "";
    const candidates = [
        `${base}/static/toolbox.json`,
        `/static/toolbox.json`,
        `./static/toolbox.json`,
        `static/toolbox.json`,
    ];

    let data = null;
    for (const path of candidates) {
        try {
            const res = await fetch(path);
            if (res.ok) {
                data = await res.json();
                break;
            }
        } catch (_) { }
    }
    if (!data) {
        console.error("Impossible de charger toolbox.json :", candidates);
        return;
    }

    const { guides, situations, tools, musthave } = data;

    const ICONS = {
        globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
        mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
        server: '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>',
        phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
        building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
        user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
        at: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
        image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
        pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
        code: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/>',
        github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
        users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        wifi: '<path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>',
        notebook: '<path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M16 2v20"/>',
        network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
        map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
        boat: '<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/>',
        bird: '<path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/>',
        archive: '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
        car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
        coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
        clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        bug: '<path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/>',
        external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    };
    const icon = (name, size = 18) =>
        `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

    const TYPES = {
        web: { label: "En ligne", color: "#378ADD" },
        cli: { label: "CLI", color: "#8c85e6" },
        ext: { label: "Extension", color: "#1D9E75" },
        man: { label: "Manuel", color: "#d69a3a" },
    };

    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

    const toolName = (tool) => {
        if (!tool.url) return `<span class="tb-name">${esc(tool.name)}</span>`;
        const external = /^https?:/.test(tool.url);
        return `<a class="tb-name tb-link" href="${esc(tool.url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(tool.name)}${external ? icon("external", 12) : ""}</a>`;
    };
    const typeBadge = (type) =>
        `<span class="tb-type" style="--tb-c:${TYPES[type].color}">${TYPES[type].label}</span>`;

    // Cases cochées : mémorisées par navigateur (localStorage), purement locales.
    const STORE_KEY = "toolbox-checklist-v1";
    let done = {};
    try { done = JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); } catch (_) { }
    const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(done)); } catch (_) { } };

    let current = Object.keys(situations)[0];
    let checklistType = "all";
    let directoryType = "all";
    let directoryQuery = "";

    const filterBar = (id, active) =>
        `<div class="tb-filters" id="${id}">${[["all", "Tous"], ...Object.entries(TYPES).map(([k, v]) => [k, v.label])]
            .map(([k, label]) => `<button type="button" class="tb-filter${k === active ? " on" : ""}" data-type="${k}" style="--tb-c:${TYPES[k]?.color || "#ff8a3d"}">${label}</button>`)
            .join("")}</div>`;

    const guideCards = guides.map((g) => {
        const inner = `
            <span class="tb-guide-icon">${icon(g.icon, 20)}</span>
            <span class="tb-guide-text">
                <span class="tb-guide-title">${esc(g.name)}${g.soon ? '<span class="tb-soon">Bientôt</span>' : ""}</span>
                <span class="tb-guide-desc">${esc(g.desc)}</span>
            </span>`;
        return g.href
            ? `<a class="tb-guide tb-guide-live" href="${esc(g.href)}">${inner}</a>`
            : `<div class="tb-guide">${inner}</div>`;
    }).join("");

    const startButtons = Object.entries(situations).map(([id, s]) =>
        `<button type="button" class="tb-start${id === current ? " on" : ""}" data-sit="${id}">${icon(s.icon, 16)}<span>${esc(s.label)}</span></button>`
    ).join("");

    // Images optionnelles par section ("images" dans toolbox.json, chemins
    // relatifs à content/). Le préfixe "../" tient compte de la profondeur
    // de la page (Toolbox/Toolbox est un niveau sous la racine).
    const depth = (document.body?.dataset?.slug || "Toolbox/Toolbox").split("/").length - 1;
    const imgBase = "../".repeat(depth);
    const images = data.images || {};
    const heroes = data.heroes || {};
    const heroImg = (h) => {
        const o = typeof h === "string" ? { src: h } : h;
        const style = o.ratio ? ` style="aspect-ratio:${o.ratio};object-fit:cover;object-position:${o.pos || "center"}"` : "";
        return `<img class="tb-hero-img" src="${imgBase}${esc(o.src)}" alt="" width="${o.w || 2172}" height="${o.h || 724}"${style}>`;
    };
    const head = (title, sub, key, first = false) => heroes[key] ? `
        <div class="tb-hero${heroes[key].layout === "side" ? " tb-hero-side" : ""}">
            <div class="tb-hero-text">
                <span class="tb-hero-bar"></span>
                <h2 class="tb-h" data-slot="${key}">${esc(title)}</h2>
                <p class="tb-sub">${esc(sub)}</p>
            </div>
            ${heroImg(heroes[key])}
        </div>` : `
        <div class="tb-head">
            <div class="tb-head-text">
                <h2 class="tb-h${first ? " tb-h-first" : ""}" data-slot="${key}">${esc(title)}</h2>
                <p class="tb-sub">${esc(sub)}</p>
            </div>
            ${images[key] ? `<img class="tb-head-img" src="${imgBase}${esc(images[key])}" alt="" loading="lazy">` : ""}
        </div>`;

    const COLLAB = {
        yes: { label: "Collaboratif", color: "#1D9E75" },
        no: { label: "Non collaboratif de base", color: "#9b928b" },
        soon: { label: "Collaboratif bientôt", color: "#d69a3a" },
    };
    const musthaveHtml = musthave ? `
    <section class="tb-section">
    ${head(musthave.title, musthave.intro, "musthave")}
    <div class="tb-must">${musthave.groups.map((g) => `
        <div class="tb-must-group">
            <div class="tb-must-title">${esc(g.title)}</div>
            <div class="tb-must-desc">${esc(g.desc)}</div>
            ${g.tools.map((t) => `
            <div class="tb-must-tool">
                <div class="tb-must-head">
                    ${toolName(t)}
                    ${t.pick ? '<span class="tb-pick">Mon choix</span>' : ""}
                    ${COLLAB[t.collab] ? `<span class="tb-type" style="--tb-c:${COLLAB[t.collab].color}">${COLLAB[t.collab].label}</span>` : ""}
                </div>
                <div class="tb-desc">${esc(t.note)}</div>
            </div>`).join("")}
        </div>`).join("")}
    </div>
    </section>` : "";

    root.innerHTML = `
    <style>
      #toolbox-root .tb-h.tb-h-first { margin-top: 0; }
      #toolbox-root .tb-must { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.3rem; }
      #toolbox-root .tb-must-group { border: 1px solid var(--tb-border); border-radius: 14px; padding: 1.3rem 1.4rem; }
      #toolbox-root .tb-must-title { font-weight: 700; font-size: 1rem; color: var(--dark); }
      #toolbox-root .tb-must-desc { font-size: 0.8rem; color: var(--darkgray); margin: 0.3rem 0 0.9rem; line-height: 1.55; }
      #toolbox-root .tb-must-tool { padding: 0.8rem 0; border-top: 1px solid var(--tb-border); }
      #toolbox-root .tb-must-head { display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem; }
      #toolbox-root .tb-pick { font-size: 0.68rem; font-weight: 600; padding: 0.12rem 0.55rem; border-radius: 999px; color: #fff; background: var(--tb-accent); }
    </style>
    <style>
      #toolbox-root { --tb-accent: #ff8a3d; --tb-border: var(--lightgray); --tb-muted: var(--gray); margin: 1rem 0 3rem; }
      #toolbox-root * { box-sizing: border-box; }
      #toolbox-root .tb-h { margin: 0 0 0.4rem; font-size: 1.25rem; }
      #toolbox-root .tb-section { margin-top: 3.2rem; padding-top: 2.6rem; border-top: 1px solid var(--tb-border); }
      #toolbox-root .tb-section-first { margin-top: 0; padding-top: 0; border-top: none; }
      #toolbox-root .tb-head { display: flex; align-items: center; justify-content: space-between; gap: 1.6rem; margin-bottom: 1.4rem; }
      #toolbox-root .tb-head-text { flex: 1; min-width: 0; }
      #toolbox-root .tb-hero { overflow: hidden; border-radius: 16px; background: #0b0b0d; margin-bottom: 1.8rem; }
      #toolbox-root .tb-hero-text { padding: 2rem 2.4rem 0; position: relative; z-index: 1; }
      #toolbox-root .tb-hero-bar { display: block; width: 36px; height: 3px; margin-bottom: 1rem; border-radius: 2px; background: var(--tb-accent); }
      #toolbox-root .tb-hero .tb-h { margin: 0 0 0.6rem; font-size: 1.5rem; line-height: 1.15; color: #f5f2ee; }
      #toolbox-root .tb-hero .tb-sub { color: #b9b2ab; max-width: 62ch; }
      #toolbox-root .tb-hero-side { position: relative; display: flex; align-items: center; min-height: 200px; }
      #toolbox-root .tb-hero-side .tb-hero-text { max-width: 54%; padding: 2rem 2.4rem; }
      #toolbox-root .tb-hero-side .tb-hero-img { position: absolute; top: 0; right: 0; height: 100%; width: auto; max-width: none; margin: 0; -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 38%); mask-image: linear-gradient(to right, transparent 0%, #000 38%); }
      #toolbox-root .tb-hero-img { display: block; width: 100%; height: auto; margin: -0.6rem 0 0; border-radius: 0; cursor: default; -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 28%); mask-image: linear-gradient(to bottom, transparent 0%, #000 28%); }
      #toolbox-root .tb-head-img { flex: none; width: 190px; max-width: 34%; height: auto; margin: 0; border-radius: 12px; }
      #toolbox-root .tb-sub { margin: 0; font-size: 0.88rem; line-height: 1.65; color: var(--darkgray); }
      #toolbox-root .tb-guides { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.2rem; }
      #toolbox-root .tb-guide { display: flex; gap: 0.7rem; align-items: flex-start; border: 1px solid var(--tb-border); border-radius: 14px; padding: 1.15rem 1.3rem; text-decoration: none; transition: border-color .14s ease, transform .14s ease; }
      #toolbox-root .tb-guide-icon { color: var(--tb-accent); flex: none; margin-top: 2px; }
      #toolbox-root .tb-guide-text { display: flex; flex-direction: column; gap: 0.25rem; min-width: 0; }
      #toolbox-root .tb-guide-title { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; font-weight: 700; font-size: 0.95rem; color: var(--dark); }
      #toolbox-root .tb-guide-desc { font-weight: 400; font-size: 0.8rem; line-height: 1.4; color: var(--darkgray); }
      #toolbox-root a.tb-guide { font-weight: 400; background: none; color: inherit; }
      #toolbox-root .tb-guide-live { border-color: color-mix(in srgb, var(--tb-accent) 55%, transparent); }
      #toolbox-root .tb-guide-live:hover { border-color: var(--tb-accent); transform: translateY(-1px); }
      #toolbox-root .tb-soon { font-size: 0.68rem; font-weight: 600; padding: 0.1rem 0.5rem; border-radius: 999px; border: 1px dashed var(--tb-border); color: var(--darkgray); }
      #toolbox-root .tb-starts { display: flex; flex-wrap: wrap; gap: 0.65rem; margin-bottom: 1.8rem; }
      #toolbox-root .tb-start, #toolbox-root .tb-filter, #toolbox-root .tb-reset { font: inherit; cursor: pointer; color: var(--dark); background: transparent; border: 1px solid var(--tb-border); transition: background .12s ease, border-color .12s ease; }
      #toolbox-root .tb-start { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.85rem; border-radius: 999px; font-size: 0.85rem; }
      #toolbox-root .tb-start:hover, #toolbox-root .tb-filter:hover { border-color: var(--tb-accent); }
      #toolbox-root .tb-start.on { background: var(--tb-accent); border-color: var(--tb-accent); color: #fff; }
      #toolbox-root .tb-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 0.9rem; }
      #toolbox-root .tb-prog { font-size: 0.85rem; color: var(--darkgray); display: flex; align-items: center; gap: 0.6rem; }
      #toolbox-root .tb-reset { font-size: 0.75rem; padding: 0.15rem 0.6rem; border-radius: 999px; color: var(--darkgray); }
      #toolbox-root .tb-filters { display: flex; flex-wrap: wrap; gap: 0.4rem; }
      #toolbox-root .tb-filter { padding: 0.25rem 0.7rem; border-radius: 999px; font-size: 0.78rem; }
      #toolbox-root .tb-filter.on { background: var(--tb-c); border-color: transparent; color: #fff; }
      #toolbox-root .tb-panel { border: 1px solid var(--tb-border); border-radius: 14px; padding: 0.3rem 1.4rem; }
      #toolbox-root .tb-item { display: flex; gap: 0.75rem; align-items: flex-start; padding: 1rem 0; border-bottom: 1px solid var(--tb-border); }
      #toolbox-root .tb-item:last-child { border-bottom: none; }
      #toolbox-root .tb-item input { margin: 0.3rem 0 0 0; transform: none; width: 16px; height: 16px; flex: none; accent-color: var(--tb-accent); cursor: pointer; }
      #toolbox-root .tb-item-main { flex: 1; min-width: 0; }
      #toolbox-root .tb-item.checked .tb-name { text-decoration: line-through; opacity: 0.55; }
      #toolbox-root .tb-name { font-weight: 700; font-size: 0.95rem; color: var(--dark); }
      #toolbox-root a.tb-link { color: var(--tb-accent); text-decoration: none; background: none; display: inline-flex; align-items: center; gap: 0.3rem; padding: 0; }
      #toolbox-root a.tb-link:hover { text-decoration: underline; }
      #toolbox-root .tb-desc { font-size: 0.8rem; color: var(--darkgray); margin-top: 0.1rem; line-height: 1.4; }
      #toolbox-root .tb-tags { display: flex; flex-direction: column; align-items: flex-end; gap: 0.3rem; flex: none; }
      #toolbox-root .tb-type { font-size: 0.68rem; font-weight: 600; padding: 0.12rem 0.55rem; border-radius: 999px; white-space: nowrap; color: var(--tb-c); background: color-mix(in srgb, var(--tb-c) 18%, transparent); }
      #toolbox-root .tb-use { font-size: 0.68rem; padding: 0.12rem 0.55rem; border-radius: 999px; border: 1px solid var(--tb-border); color: var(--darkgray); white-space: nowrap; }
      #toolbox-root .tb-empty { padding: 1rem 0; font-size: 0.85rem; color: var(--darkgray); font-style: italic; }
      #toolbox-root .tb-search { font: inherit; font-size: 0.85rem; padding: 0.35rem 0.75rem; border-radius: 999px; border: 1px solid var(--tb-border); background: transparent; color: var(--dark); width: 220px; max-width: 100%; }
      #toolbox-root .tb-search:focus { outline: none; border-color: var(--tb-accent); }
      #toolbox-root .tb-directory { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 1rem; }
      #toolbox-root .tb-details { margin-top: 0.4rem; }
      #toolbox-root .tb-summary { cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 1rem; font-size: 0.95rem; font-weight: 600; padding: 1rem 1.4rem; border-radius: 14px; border: 1px solid var(--tb-border); background: color-mix(in srgb, var(--tb-accent) 8%, transparent); color: var(--dark); list-style: none; margin-bottom: 1.2rem; transition: border-color .15s, background .15s; }
      #toolbox-root .tb-summary::after { content: ''; width: 9px; height: 9px; border-right: 2px solid var(--tb-accent); border-bottom: 2px solid var(--tb-accent); transform: rotate(45deg); margin-top: -4px; transition: transform .2s; flex-shrink: 0; }
      #toolbox-root .tb-details[open] > .tb-summary::after { transform: rotate(-135deg); margin-top: 4px; }
      #toolbox-root .tb-summary:hover { background: color-mix(in srgb, var(--tb-accent) 14%, transparent); }
      #toolbox-root .tb-summary .tb-sum-open { display: none; }
      #toolbox-root .tb-details[open] .tb-sum-closed { display: none; }
      #toolbox-root .tb-details[open] .tb-sum-open { display: inline; }
      #toolbox-root .tb-summary::-webkit-details-marker { display: none; }
      #toolbox-root .tb-summary:hover { border-color: var(--tb-accent); }
      #toolbox-root .tb-details[open] > .tb-summary { border-color: var(--tb-accent); }
      #toolbox-root .tb-card { border: 1px solid var(--tb-border); border-radius: 12px; padding: 0.9rem 1.05rem; }
      #toolbox-root .tb-card-top { display: flex; justify-content: space-between; gap: 0.5rem; align-items: center; }
      @media (max-width: 600px) {
        #toolbox-root .tb-guides { grid-template-columns: 1fr; }
        #toolbox-root .tb-head { flex-direction: column-reverse; align-items: flex-start; }
        #toolbox-root .tb-head-img { width: 160px; max-width: 70%; }
        #toolbox-root .tb-hero-text, #toolbox-root .tb-hero-side .tb-hero-text { padding: 1.5rem 1.4rem 0; max-width: 100%; }
        #toolbox-root .tb-hero-side { display: block; min-height: 0; }
        #toolbox-root .tb-hero-side .tb-hero-img { position: static; width: 100%; height: auto; margin: -0.6rem 0 0; -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 28%); mask-image: linear-gradient(to bottom, transparent 0%, #000 28%); }
        #toolbox-root .tb-item { flex-wrap: wrap; }
        #toolbox-root .tb-tags { flex-direction: row; align-items: center; margin-left: 28px; }
      }
    </style>

    <section class="tb-section tb-section-first">
    ${head("Guides et cheatsheets", "Des mini-cours pour prendre un outil en main.", "guides", true)}
    <div class="tb-guides">${guideCards}</div>
    </section>

    ${musthaveHtml}

    <section class="tb-section">
    ${head("J'ai quelque chose, je fais quoi ?", "Choisis ce que tu as en main : la checklist liste ce qu'il est possible de tester, pour ne rien oublier pendant une analyse.", "situations")}
    <div class="tb-starts" id="tb-starts">${startButtons}</div>
    <div class="tb-bar">
      <span class="tb-prog"><span id="tb-prog"></span><button type="button" class="tb-reset" id="tb-reset">Réinitialiser</button></span>
      ${filterBar("tb-filters-1", checklistType)}
    </div>
    <div class="tb-panel" id="tb-list"></div>
    </section>

    <section class="tb-section">
    ${head("Annuaire complet", "Tous les outils, y compris ceux qui n'ont pas de situation dédiée.", "directory")}
    <details class="tb-details">
      <summary class="tb-summary"><span class="tb-sum-closed">Afficher les ${tools.length} outils</span><span class="tb-sum-open">Masquer les ${tools.length} outils</span></summary>
      <div class="tb-bar tb-bar-dir">
        <input type="search" class="tb-search" id="tb-search" placeholder="Rechercher un outil" aria-label="Rechercher un outil">
        ${filterBar("tb-filters-2", directoryType)}
      </div>
      <div class="tb-directory" id="tb-directory"></div>
    </details>
    </section>
    `;

    // Titres de section : ceux écrits en markdown (#tb-headings) sont réellement
    // dans la table des matières. On les déplace à la place des titres de secours.
    const mdHeads = [...document.querySelectorAll("#tb-headings h1, #tb-headings h2")];
    ["guides", "musthave", "situations", "directory"].forEach((key, i) => {
        const slot = root.querySelector(`[data-slot="${key}"]`);
        const h = mdHeads[i];
        if (!slot || !h) return;
        h.classList.add("tb-h");
        if (slot.classList.contains("tb-h-first")) h.classList.add("tb-h-first");
        slot.replaceWith(h);
    });

    const renderChecklist = () => {
        const all = tools.filter((t) => t.for.includes(current));
        const shown = all.filter((t) => checklistType === "all" || t.type === checklistType);
        const doneCount = all.filter((t) => done[`${current}:${t.name}`]).length;
        root.querySelector("#tb-prog").textContent = `${doneCount} sur ${all.length} faits`;
        root.querySelector("#tb-list").innerHTML = shown.length
            ? shown.map((t) => {
                const key = `${current}:${t.name}`;
                const checked = !!done[key];
                return `<div class="tb-item${checked ? " checked" : ""}">
                    <input type="checkbox" data-key="${esc(key)}" ${checked ? "checked" : ""} aria-label="Fait : ${esc(t.name)}">
                    <div class="tb-item-main">${toolName(t)}<div class="tb-desc">${esc(t.desc)}</div></div>
                    <div class="tb-tags">${typeBadge(t.type)}<span class="tb-use">${esc(t.use)}</span></div>
                </div>`;
            }).join("")
            : `<div class="tb-empty">Aucun outil de ce type pour cette situation.</div>`;
    };

    const renderDirectory = () => {
        const q = directoryQuery.trim().toLowerCase();
        const shown = tools.filter((t) =>
            (directoryType === "all" || t.type === directoryType) &&
            (!q || `${t.name} ${t.desc} ${t.use}`.toLowerCase().includes(q))
        );
        root.querySelector("#tb-directory").innerHTML = shown.length
            ? shown.map((t) => `<div class="tb-card">
                <div class="tb-card-top">${toolName(t)}${typeBadge(t.type)}</div>
                <div class="tb-desc">${esc(t.desc)}</div>
            </div>`).join("")
            : `<div class="tb-empty">Aucun résultat.</div>`;
    };

    root.querySelector("#tb-starts").addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-sit]");
        if (!btn) return;
        current = btn.dataset.sit;
        root.querySelectorAll("#tb-starts .tb-start").forEach((b) => b.classList.toggle("on", b === btn));
        renderChecklist();
    });
    root.querySelector("#tb-list").addEventListener("change", (e) => {
        const key = e.target?.dataset?.key;
        if (!key) return;
        if (e.target.checked) done[key] = true; else delete done[key];
        save();
        renderChecklist();
    });
    root.querySelector("#tb-reset").addEventListener("click", () => {
        Object.keys(done).filter((k) => k.startsWith(`${current}:`)).forEach((k) => delete done[k]);
        save();
        renderChecklist();
    });
    const bindFilters = (id, onPick) => {
        root.querySelector(`#${id}`).addEventListener("click", (e) => {
            const btn = e.target.closest("button[data-type]");
            if (!btn) return;
            root.querySelectorAll(`#${id} .tb-filter`).forEach((b) => b.classList.toggle("on", b === btn));
            onPick(btn.dataset.type);
        });
    };
    bindFilters("tb-filters-1", (t) => { checklistType = t; renderChecklist(); });
    bindFilters("tb-filters-2", (t) => { directoryType = t; renderDirectory(); });
    root.querySelector("#tb-search").addEventListener("input", (e) => {
        directoryQuery = e.target.value;
        renderDirectory();
    });

    renderChecklist();
    renderDirectory();
};

document.addEventListener("DOMContentLoaded", initToolbox);
document.addEventListener("nav", initToolbox);
