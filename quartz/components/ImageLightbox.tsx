import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function ImageLightbox(_props: QuartzComponentProps) {
  return (
    <div class="img-lightbox" id="img-lightbox" aria-hidden="true">
      <div class="img-lightbox-backdrop" data-lightbox-close></div>

      <div
        class="img-lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Aperçu de l’image"
      >
        <button
          class="img-lightbox-close"
          id="img-lightbox-close"
          type="button"
          aria-label="Fermer l’aperçu"
        >
          ×
        </button>

        <img class="img-lightbox-image" id="img-lightbox-image" src="" alt="" />
        <p class="img-lightbox-caption" id="img-lightbox-caption"></p>
      </div>
    </div>
  )
}

ImageLightbox.afterDOMLoaded = `
  ;(() => {
    const initImageLightbox = () => {
      const lightbox = document.getElementById("img-lightbox")
      const lightboxImage = document.getElementById("img-lightbox-image")
      const lightboxCaption = document.getElementById("img-lightbox-caption")
      const closeBtn = document.getElementById("img-lightbox-close")

      if (!lightbox || !lightboxImage || !lightboxCaption || !closeBtn) return

      const openLightbox = (img) => {
        const src = img.currentSrc || img.src
        const alt = img.getAttribute("alt") || ""

        if (!src) return

        lightboxImage.src = src
        lightboxImage.alt = alt
        lightboxCaption.textContent = alt

        lightbox.classList.add("is-open")
        lightbox.setAttribute("aria-hidden", "false")
        document.body.style.overflow = "hidden"
        closeBtn.focus()
      }

      const closeLightbox = () => {
        lightbox.classList.remove("is-open")
        lightbox.setAttribute("aria-hidden", "true")
        lightboxImage.src = ""
        lightboxImage.alt = ""
        lightboxCaption.textContent = ""
        document.body.style.overflow = ""
      }

      const shouldSkipImage = (img) => {
        const rawSrc = img.getAttribute("src") || ""
        const resolvedSrc = img.src || ""

        if (img.closest("#badges-root")) return true
        if (img.closest("a")) return true

        if (
          rawSrc.includes("content/Logo/") ||
          rawSrc.includes("/Logo/") ||
          resolvedSrc.includes("content/Logo/") ||
          resolvedSrc.includes("/Logo/")
        ) {
          return true
        }

        if (
          rawSrc.includes("content/Badges/") ||
          rawSrc.includes("/Badges/") ||
          resolvedSrc.includes("content/Badges/") ||
          resolvedSrc.includes("/Badges/")
        ) {
          return true
        }

        return false
      }

      const bindImages = (root = document) => {
        root.querySelectorAll("article img").forEach((img) => {
          if (shouldSkipImage(img)) {
            img.style.cursor = "default"
            img.dataset.lightboxBound = "skip"
            return
          }

          if (img.dataset.lightboxBound === "true") return

          img.dataset.lightboxBound = "true"
          img.style.cursor = "zoom-in"
          img.addEventListener("click", (e) => {
            e.preventDefault()
            e.stopPropagation()
            openLightbox(img)
          })
        })
      }

      bindImages(document)

      if (!lightbox.dataset.lightboxEventsBound) {
        closeBtn.addEventListener("click", closeLightbox)

        lightbox.addEventListener("click", (e) => {
          const target = e.target
          if (target && target.matches && target.matches("[data-lightbox-close]")) {
            closeLightbox()
          }
        })

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox()
          }
        })

        lightbox.dataset.lightboxEventsBound = "true"
      }

      if (!window.__imageLightboxObserver) {
        window.__imageLightboxObserver = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            mutation.addedNodes.forEach((node) => {
              if (!(node instanceof HTMLElement)) return

              if (node.matches("article img")) {
                bindImages(node.parentElement || document)
              } else {
                bindImages(node)
              }
            })
          }
        })

        window.__imageLightboxObserver.observe(document.body, {
          childList: true,
          subtree: true,
        })
      }
    }

    initImageLightbox()
    document.addEventListener("nav", initImageLightbox)
  })()
`

export default (() => ImageLightbox) satisfies QuartzComponentConstructor