import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import breadcrumbsStyle from "./styles/breadcrumbs.scss"
import { FullSlug, SimpleSlug, resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"
import { trieFromAllFiles } from "../util/ctx"

type CrumbData = {
  displayName: string
  path: string
}

interface BreadcrumbOptions {
  /**
   * Symbol between crumbs
   */
  spacerSymbol: string
  /**
   * Name of first crumb
   */
  rootName: string
  /**
   * Whether to look up frontmatter title for folders (could cause performance problems with big vaults)
   */
  resolveFrontmatterTitle: boolean
  /**
   * Whether to display the current page in the breadcrumbs.
   */
  showCurrentPage: boolean
}

const defaultOptions: BreadcrumbOptions = {
  spacerSymbol: "❯",
  rootName: "Home",
  resolveFrontmatterTitle: true,
  showCurrentPage: true,
}

function formatCrumb(displayName: string, baseSlug: FullSlug, currentSlug: SimpleSlug): CrumbData {
  return {
    displayName: displayName.replaceAll("-", " "),
    path: resolveRelative(baseSlug, currentSlug),
  }
}

export default ((opts?: Partial<BreadcrumbOptions>) => {
  const options: BreadcrumbOptions = { ...defaultOptions, ...opts }
  const Breadcrumbs: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    ctx,
  }: QuartzComponentProps) => {
    const trie = (ctx.trie ??= trieFromAllFiles(allFiles))
    const slugParts = fileData.slug!.split("/")
    const pathNodes = trie.ancestryChain(slugParts)

    if (!pathNodes) {
      return null
    }

    const crumbs: CrumbData[] = pathNodes.map((node, idx) => {
      // Folders that have a "home file" (a file sharing the folder's name,
      // e.g. `Foo/Foo.md`) should link to that home file rather than the
      // auto-generated folder listing page.
      const home = node.findHomeChild()
      const targetSlug = (home?.data?.slug as FullSlug | undefined) ?? node.slug

      const crumb = formatCrumb(node.displayName, fileData.slug!, simplifySlug(targetSlug))
      if (idx === 0) {
        crumb.displayName = options.rootName
      }

      // For last node (current page), set empty path
      if (idx === pathNodes.length - 1) {
        crumb.path = ""
      }

      return crumb
    })

    if (!options.showCurrentPage) {
      crumbs.pop()
    }

    // Collapse consecutive crumbs with the same display name. This happens
    // when viewing a folder's home file directly: the folder crumb and the
    // current-page crumb would otherwise show the same name twice.
    const dedupedCrumbs = crumbs.filter((crumb, idx) => {
      const next = crumbs[idx + 1]
      return !(next && next.displayName === crumb.displayName)
    })

    return (
      <nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
        {dedupedCrumbs.map((crumb, index) => (
          <div class="breadcrumb-element">
            <a href={crumb.path}>{crumb.displayName}</a>
            {index !== dedupedCrumbs.length - 1 && <p>{` ${options.spacerSymbol} `}</p>}
          </div>
        ))}
      </nav>
    )
  }
  Breadcrumbs.css = breadcrumbsStyle

  return Breadcrumbs
}) satisfies QuartzComponentConstructor
