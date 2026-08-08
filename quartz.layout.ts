import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { Options as ExplorerOptions } from "./quartz/components/Explorer"

// Pages qui définissent un champ `order:` dans leur frontmatter sont
// affichées en premier (triées par ordre croissant). Les pages/dossiers
// sans `order` gardent le comportement par défaut (dossiers d'abord, puis
// tri alphabétique). Ça permet de choisir un ordre manuel dossier par
// dossier, sans y toucher pour le reste du site.
export const explorerSortFn: ExplorerOptions["sortFn"] = (a, b) => {
    const orderA = a.data?.order
    const orderB = b.data?.order

    if (orderA !== undefined && orderB !== undefined) {
        return orderA - orderB
    }
    if (orderA !== undefined) {
        return -1
    }
    if (orderB !== undefined) {
        return 1
    }

    // comportement par défaut de Quartz
    if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
        return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
        })
    }

    return !a.isFolder && b.isFolder ? 1 : -1
}

// Dossiers ayant un fichier du même nom qu'eux (ex: "Foo/Foo.md") : ce fichier
// est la page d'accueil du dossier. On "remonte" ses infos (dont le slug) sur
// le noeud dossier lui-même via mapFn, puis on le masque de la liste des
// enfants via filterFn. Résultat : le dossier n'apparaît plus en double dans
// l'Explorer, et son lien pointe vers la page d'accueil au lieu de la page
// de listing générée automatiquement (voir explorer.inline.ts).
// Le mapFn doit s'exécuter AVANT le filterFn (voir `order` ci-dessous) pour
// pouvoir encore lire l'enfant avant qu'il ne soit retiré de l'arbre.
// Affichage compact dans l'Explorer pour "L'appel de la forêt" : le préfixe
// "Chapitre N" des titres est raccourci en "CN" (ex: "Chapitre 2 - Acte 2 -
// Activités" -> "C2 - Acte 2 - Activités"). Ça ne touche que l'affichage
// dans la sidebar : le titre de la page, les breadcrumbs, etc. restent
// inchangés.
export const explorerMapFn: ExplorerOptions["mapFn"] = (node) => {
    const chapitreMatch = node.displayName.match(/^Chapitre\s+(\d+)\b(.*)$/)
    if (chapitreMatch) {
        node.displayName = `C${chapitreMatch[1]}${chapitreMatch[2]}`
    }

    if (!node.isFolder) return
    const home = node.findHomeChild()
    if (home?.data) {
        node.data = home.data
    }
}

export const explorerFilterFn: ExplorerOptions["filterFn"] = (node) => {
    if (node.slugSegment === "tags") return false
    if (node.isHomeFileOfParent) return false
    return true
}

export const explorerOrder: ExplorerOptions["order"] = ["map", "filter", "sort"]

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
    head: Component.Head(),
    header: [],
    afterBody: [Component.ImageLightbox(), Component.PlatformProfiles(), Component.HomeExplorer()],
    footer: Component.Footer({
        links: {
            Email: "mailto:skgatwork@protonmail.com",
            Discord: "https://discord.gg/3duPWeqCbn",
        },
    }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
    beforeBody: [
        Component.ConditionalRender({
            component: Component.Breadcrumbs(),
            condition: (page) => page.fileData.slug !== "index",
        }),
        Component.ArticleTitle(),
        Component.ContentMeta(),
        Component.TagList(),
    ],
    left: [
        Component.PageTitle(),
        Component.MobileOnly(Component.Spacer()),
        Component.Flex({
            components: [
                {
                    Component: Component.Search(),
                    grow: true,
                },
                { Component: Component.Darkmode() },
                { Component: Component.ReaderMode() },
            ],
        }),
        Component.Explorer({
            sortFn: explorerSortFn,
            mapFn: explorerMapFn,
            filterFn: explorerFilterFn,
            order: explorerOrder,
        }),
    ],
    right: [
        Component.Graph(),
        Component.DesktopOnly(Component.TableOfContents()),
        Component.Backlinks(),
    ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
    beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
    left: [
        Component.PageTitle(),
        Component.MobileOnly(Component.Spacer()),
        Component.Flex({
            components: [
                {
                    Component: Component.Search(),
                    grow: true,
                },
                { Component: Component.Darkmode() },
            ],
        }),
        Component.Explorer({
            sortFn: explorerSortFn,
            mapFn: explorerMapFn,
            filterFn: explorerFilterFn,
            order: explorerOrder,
        }),
    ],
    right: [],
}