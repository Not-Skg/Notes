import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
    configuration: {
        pageTitle: "SKG Notes",
        pageTitleSuffix: "",
        pageIndex: true,  // Active index pages
        folderIndex: true, // Dossiers → index.md
        links: {
            relative: true
        },
        enableSPA: true,
        enablePopovers: true,
        analytics: {
            provider: "plausible",
        },
        locale: "en-US",
        baseUrl: "quartz.jzhao.xyz",
        ignorePatterns: ["**/data.json", "journal", "private", "templates", ".obsidian"],
        defaultDateType: "modified",
        theme: {
            fontOrigin: "googleFonts",
            cdnCaching: true,
            typography: {
                header: "Schibsted Grotesk",
                body: "Source Sans Pro",
                code: "IBM Plex Mono",
            },
            colors: {
                lightMode: {
                    light: "#faf8f8",      // fond global
                    lightgray: "#e5e5e5",  // blocs / cards
                    gray: "#b8b8b8",       // bordures, séparateurs
                    darkgray: "#4e4e4e",   // texte secondaire
                    dark: "#2b2b2b",       // texte principal, header
                    secondary: "#a0522d",  // couleur principale (liens, boutons)
                    tertiary: "#c49a6c",   // accent (hover, badges)
                    highlight: "rgba(180, 120, 80, 0.12)",  // survol, selection
                    textHighlight: "#f4a26188",            // highlight de texte
                },
                darkMode: {
                    light: "#161618",      // fond global dark
                    lightgray: "#393639",  // blocs / cards
                    gray: "#646464",       // bordures, séparateurs
                    darkgray: "#d4d4d4",   // texte secondaire
                    dark: "#ebebec",       // texte principal
                    secondary: "#c4845a",  // accent identique
                    tertiary: "#c49a6c",   // accent (hover, badges)
                    highlight: "rgba(180, 120, 80, 0.12)", // survol, selection
                    textHighlight: "#c47a3588",             // highlight de texte
                },
            },
        },
    },
    plugins: {
        transformers: [
            Plugin.FrontMatter(),
            Plugin.CreatedModifiedDate({
                priority: ["frontmatter", "git", "filesystem"],
            }),
            Plugin.SyntaxHighlighting({
                theme: {
                    light: "github-light",
                    dark: "github-dark",
                },
                keepBackground: false,
            }),
            Plugin.CreatedModifiedDate({
                priority: ["frontmatter", "git", "filesystem"],  // ← filesystem fallback
            }),
            Plugin.HardLineBreaks(),
            Plugin.ObsidianFlavoredMarkdown({
                enableInHtmlEmbed: true,
                enableHighlight: true,
            }),
            Plugin.GitHubFlavoredMarkdown(),
            Plugin.TableOfContents(),
            Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
            Plugin.Description(),
            Plugin.Latex({ renderEngine: "katex" }),
        ],
        filters: [Plugin.RemoveDrafts()],
        emitters: [
            Plugin.AliasRedirects(),
            Plugin.ComponentResources(),
            Plugin.ContentPage(),
            Plugin.FolderPage(),
            Plugin.TagPage(),
            Plugin.ContentIndex({
                enableSiteMap: true,
                enableRSS: true,
            }),
            Plugin.Assets(),
            Plugin.Static(),
            Plugin.Favicon(),
            Plugin.NotFoundPage(),
            // Comment out CustomOgImages to speed up build time
            Plugin.CustomOgImages(),
        ],
    },
}

export default config

