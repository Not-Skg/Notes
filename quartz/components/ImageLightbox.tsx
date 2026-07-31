import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

// @ts-ignore
import script from "./scripts/imageLightbox.inline"

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

        <div class="img-lightbox-viewport" id="img-lightbox-viewport">
          <div class="img-lightbox-content" id="img-lightbox-content">
            <img
              class="img-lightbox-image"
              id="img-lightbox-image"
              src=""
              alt=""
              draggable={false}
            />
          </div>
        </div>
        <p class="img-lightbox-caption" id="img-lightbox-caption"></p>
      </div>
    </div>
  )
}

ImageLightbox.afterDOMLoaded = script

export default (() => ImageLightbox) satisfies QuartzComponentConstructor