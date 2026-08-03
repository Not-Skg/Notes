import { joinSegments, pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const avatarPath = joinSegments(baseDir, "static/icon.png")

  // Split "SKG Notes" into "SKG" / "Notes" so desktop can stack them on two
  // lines next to the (now bigger) avatar, like a wordmark. On mobile the
  // two spans get forced back onto a single line (see media query below) to
  // keep the top bar compact.
  const [firstWord, ...restWords] = title.split(" ")
  const rest = restWords.join(" ")

  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <img src={avatarPath} alt="" class="page-title-avatar" />
        <span class="page-title-text">
          <span class="page-title-accent">{firstWord}</span>
          {rest && <span class="page-title-rest">{rest}</span>}
        </span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}

.page-title > a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.page-title-avatar {
  width: 5rem;
  height: 5rem;
  margin: 0;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  transition: box-shadow 0.2s ease;
}

.page-title > a:hover .page-title-avatar {
  box-shadow:
    0 0 0 3px var(--highlight),
    0 0 14px 2px rgba(196, 132, 90, 0.55);
}

.page-title-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.page-title-accent {
  color: var(--secondary);
}

.page-title-rest {
  color: var(--dark);
}

@media (max-width: 800px) {
  .page-title-avatar {
    width: 3rem;
    height: 3rem;
  }

  .page-title-text {
    flex-direction: row;
    gap: 0.35rem;
  }
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
