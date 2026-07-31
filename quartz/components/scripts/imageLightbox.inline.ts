import { DiagramPanZoom } from "./panZoom"

;(() => {
  const initImageLightbox = () => {
    const lightbox = document.getElementById("img-lightbox")
    const viewport = document.getElementById("img-lightbox-viewport")
    const content = document.getElementById("img-lightbox-content")
    const lightboxImage = document.getElementById("img-lightbox-image") as HTMLImageElement | null
    const lightboxCaption = document.getElementById("img-lightbox-caption")
    const closeBtn = document.getElementById("img-lightbox-close")

    if (!lightbox || !viewport || !content || !lightboxImage || !lightboxCaption || !closeBtn) {
      return
    }

    let panZoom: DiagramPanZoom | null = null

    const isSvgSrc = (src: string) => /\.svg(?:[?#].*)?$/i.test(src)

    const teardownPanZoom = () => {
      panZoom?.cleanup()
      panZoom = null
      viewport.classList.remove("img-lightbox-viewport--zoomable")
      viewport.style.cursor = ""
      content.style.transform = ""
    }

    const setupPanZoom = () => {
      viewport.classList.add("img-lightbox-viewport--zoomable")
      viewport.style.cursor = "grab"
      panZoom = new DiagramPanZoom(viewport, content)
    }

    const openLightbox = (img: HTMLImageElement) => {
      const src = img.currentSrc || img.src
      const alt = img.getAttribute("alt") || ""

      if (!src) return

      teardownPanZoom()

      lightboxImage.alt = alt
      lightboxCaption.textContent = alt

      // Wait for the (possibly different, possibly larger) image to actually
      // be loaded before measuring it for pan/zoom, otherwise its rendered
      // size would still be 0x0.
      if (isSvgSrc(src)) {
        lightboxImage.addEventListener("load", setupPanZoom, { once: true })
      }

      lightboxImage.src = src

      lightbox.classList.add("is-open")
      lightbox.setAttribute("aria-hidden", "false")
      document.body.style.overflow = "hidden"
      closeBtn.focus()
    }

    const closeLightbox = () => {
      lightbox.classList.remove("is-open")
      lightbox.setAttribute("aria-hidden", "true")
      teardownPanZoom()
      lightboxImage.src = ""
      lightboxImage.alt = ""
      lightboxCaption.textContent = ""
      document.body.style.overflow = ""
    }

    const shouldSkipImage = (img: HTMLImageElement) => {
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

    const bindImages = (root: Document | HTMLElement = document) => {
      root.querySelectorAll("article img").forEach((el) => {
        const img = el as HTMLImageElement

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
        const target = e.target as HTMLElement | null
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

declare global {
  interface Window {
    __imageLightboxObserver?: MutationObserver
  }
}
