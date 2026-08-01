import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function HomeExplorer(_props: QuartzComponentProps) {
  return null
}

// Cette section lit le contentIndex.json (déjà chargé sur toutes les pages
// via la variable globale `fetchData`, cf. renderPage.tsx) et filtre les
// notes par tag pour construire les 4 cards "Explorer par thématique".
// Résultat : dès qu'une nouvelle note portant l'un de ces tags est publiée,
// elle apparaît automatiquement ici (et sur la page /tags/<tag> associée)
// sans qu'il faille modifier index.md à la main.
//
// NB sur les backticks ci-dessous : cette chaîne est écrite une seule fois
// comme template literal TS (afterDOMLoaded). Pour éviter les soucis
// d'échappement à répétition, la construction du HTML plus bas se fait par
// concaténation (+) plutôt que par template literals imbriqués.
HomeExplorer.afterDOMLoaded = `
  ;(() => {
    const init = async () => {
      const root = document.getElementById("home-explorer-root")
      if (!root) return

      const icons = {
        ctf: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3h8v6a4 4 0 0 1-8 0V3Z"/><path d="M8 5H4v2a4 4 0 0 0 4 4"/><path d="M16 5h4v2a4 4 0 0 1-4 4"/><path d="M12 13v4"/><path d="M9 21h6"/><path d="M10 17h4l1 4H9l1-4Z"/></svg>',
        chall: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/></svg>',
        autre: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 6v6c0 4.4 3.1 7.6 7.5 9 4.4-1.4 7.5-4.6 7.5-9V6L12 3Z"/><path d="M12 9v4"/><path d="M12 15.8h.01"/></svg>',
        toolbox: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m14.7 6.3 3 3L8.3 18.7l-4-1 1-4L14.7 6.3Z"/><path d="M13 8l3 3"/><path d="m17.5 3.5 3 3-2 2-3-3 2-2Z"/></svg>',
      }

      const categories = [
        {
          tag: "CTF",
          icon: icons.ctf,
          title: "CTF",
          description: "Mes RETEX de CTF, classés par événement.",
          moreLabel: "Voir tous les CTF",
        },
        {
          tag: "ChallOsint",
          icon: icons.chall,
          title: "Chall OSINT",
          description: "Mes RETEX de challenges OSINT sur des plateformes sympas.",
          moreLabel: "Voir tous les challenges",
          groupByPlatform: true,
        },
        {
          tag: "AutreChall",
          icon: icons.autre,
          title: "Autres challenges",
          description: "Tout ce qui sort de l'OSINT : SOC, DFIR, CTI, et le reste.",
          moreLabel: "Voir tous les labs",
        },
        {
          tag: "Toolbox",
          icon: icons.toolbox,
          title: "Toolbox",
          description: "Outils, scripts et ressources que j'utilise au quotidien.",
          moreLabel: "Voir toutes les ressources",
          moreHref: "./Toolbox/Toolbox",
        },
      ]

      const MAX_ITEMS = 5
      const MAX_PLATFORMS = 6

      // Plateformes connues (mêmes noms que PlatformProfiles.tsx). Le tag est
      // comparé sans tenir compte de la casse aux tags de chaque note, donc
      // "Osint4fun" et "Osint4Fun" matchent tous les deux la même entrée.
      // Pour ajouter une nouvelle plateforme : lui donner ce tag dans le
      // frontmatter des notes concernées, et l'ajouter ici pour un joli nom
      // d'affichage (sinon elle apparaît sous "Autres").
      // "tag" = casse exacte utilisée dans le frontmatter (sert à construire
      // le lien vers la page /tags/<tag> correspondante, qui est sensible à
      // la casse). La comparaison elle-même se fait en minuscule.
      const platformRegistry = [
        { tag: "Osint4fun", label: "Osint4Fun" },
        { tag: "TryHackMe", label: "TryHackMe" },
        { tag: "OSINT-FR", label: "OSINT-FR" },
        { tag: "IsFred", label: "IsFred" },
        { tag: "OSINTOPIA", label: "Osintopia" },
        { tag: "YouArePlayer", label: "YouArePlayer" },
      ]

      const escapeHtml = (str) =>
        String(str)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")

      const findPlatform = (entry) => {
        const tags = Array.isArray(entry.tags) ? entry.tags : []
        for (const t of tags) {
          const found = platformRegistry.find(
            (p) => p.tag.toLowerCase() === String(t).toLowerCase(),
          )
          if (found) return found
        }
        return { tag: entry.tags && entry.tags[0], label: "Autres" }
      }

      const buildPlatformItems = (matches) => {
        const groups = new Map()
        for (const e of matches) {
          const platform = findPlatform(e)
          const key = platform.label
          if (!groups.has(key)) {
            groups.set(key, { label: key, tag: platform.tag, count: 0 })
          }
          groups.get(key).count += 1
        }

        const sorted = [...groups.values()].sort(
          (a, b) => b.count - a.count || a.label.localeCompare(b.label, "fr"),
        )

        const shown = sorted.slice(0, MAX_PLATFORMS)
        const remaining = sorted.length - shown.length

        let itemsHtml = shown
          .map((g) => {
            const href = g.tag ? "./tags/" + g.tag : "#"
            const count = g.count + (g.count > 1 ? " challs" : " chall")
            return (
              '<li><a href="' +
              href +
              '">' +
              escapeHtml(g.label) +
              "</a> · " +
              count +
              "</li>"
            )
          })
          .join("")

        if (remaining > 0) {
          itemsHtml +=
            '<li class="explorer-more-count">+ ' +
            remaining +
            (remaining > 1 ? " autres plateformes" : " autre plateforme") +
            "</li>"
        }

        return itemsHtml
      }

      const buildCard = (cat, entries) => {
        const matches = entries
          .filter((e) => Array.isArray(e.tags) && e.tags.includes(cat.tag))
          .sort((a, b) => a.title.localeCompare(b.title, "fr"))

        let itemsHtml = ""
        if (matches.length === 0) {
          itemsHtml = '<li class="explorer-empty">À venir</li>'
        } else if (cat.groupByPlatform) {
          itemsHtml = buildPlatformItems(matches)
        } else {
          const shown = matches.slice(0, MAX_ITEMS)
          const remaining = matches.length - shown.length
          itemsHtml = shown
            .map(
              (e) =>
                '<li><a href="./' + e.slug + '">' + escapeHtml(e.title) + "</a></li>",
            )
            .join("")
          if (remaining > 0) {
            itemsHtml +=
              '<li class="explorer-more-count">+ ' +
              remaining +
              (remaining > 1 ? " autres" : " autre") +
              "</li>"
          }
        }

        const moreHref = cat.moreHref || "./tags/" + cat.tag

        return (
          '<article class="explorer-card">' +
          '<div class="explorer-card-top">' +
          '<span class="explorer-icon">' +
          cat.icon +
          "</span>" +
          "<h3>" +
          escapeHtml(cat.title) +
          "</h3>" +
          "</div>" +
          '<p class="explorer-description">' +
          escapeHtml(cat.description) +
          "</p>" +
          '<ul class="explorer-list">' +
          itemsHtml +
          "</ul>" +
          '<a class="explorer-more" href="' +
          moreHref +
          '">' +
          escapeHtml(cat.moreLabel) +
          " →</a>" +
          "</article>"
        )
      }

      const render = (data) => {
        const entries = Object.values(data)
        const cardsHtml = categories.map((cat) => buildCard(cat, entries)).join("")
        root.innerHTML = '<div class="explorer-grid">' + cardsHtml + "</div>"
      }

      try {
        const data = await fetchData
        render(data)
      } catch (err) {
        console.error("HomeExplorer: impossible de charger contentIndex.json", err)
      }
    }

    init()
    document.addEventListener("nav", init)
  })()
`

export default (() => HomeExplorer) satisfies QuartzComponentConstructor
