export interface Position {
  x: number
  y: number
}

export class DiagramPanZoom {
  private isDragging = false
  private startPan: Position = { x: 0, y: 0 }
  private currentPan: Position = { x: 0, y: 0 }
  private scale = 1
  private minScale = 0.5
  private readonly MAX_SCALE = 3

  cleanups: (() => void)[] = []

  constructor(
    private container: HTMLElement,
    private content: HTMLElement,
  ) {
    this.setupEventListeners()
    this.setupNavigationControls()
    this.resetTransform()
  }

  private setupEventListeners() {
    // Mouse drag events
    const mouseDownHandler = this.onMouseDown.bind(this)
    const mouseMoveHandler = this.onMouseMove.bind(this)
    const mouseUpHandler = this.onMouseUp.bind(this)

    // Touch drag events
    const touchStartHandler = this.onTouchStart.bind(this)
    const touchMoveHandler = this.onTouchMove.bind(this)
    const touchEndHandler = this.onTouchEnd.bind(this)

    const resizeHandler = this.resetTransform.bind(this)

    // Browsers natively start dragging <img> (and sometimes <svg>) elements
    // on mousedown, which hijacks the mouse events we rely on for panning.
    // Blocking "dragstart" disables that native behavior so our own
    // mousedown/mousemove panning works no matter where on the diagram the
    // click starts.
    const dragStartHandler = (e: Event) => e.preventDefault()
    this.content.addEventListener("dragstart", dragStartHandler)

    // Wheel/trackpad zoom, centered on wherever the cursor is pointing.
    const wheelHandler = this.onWheel.bind(this)
    this.container.addEventListener("wheel", wheelHandler, { passive: false })

    this.container.addEventListener("mousedown", mouseDownHandler)
    document.addEventListener("mousemove", mouseMoveHandler)
    document.addEventListener("mouseup", mouseUpHandler)

    this.container.addEventListener("touchstart", touchStartHandler, { passive: false })
    document.addEventListener("touchmove", touchMoveHandler, { passive: false })
    document.addEventListener("touchend", touchEndHandler)

    window.addEventListener("resize", resizeHandler)

    this.cleanups.push(
      () => this.content.removeEventListener("dragstart", dragStartHandler),
      () => this.container.removeEventListener("wheel", wheelHandler),
      () => this.container.removeEventListener("mousedown", mouseDownHandler),
      () => document.removeEventListener("mousemove", mouseMoveHandler),
      () => document.removeEventListener("mouseup", mouseUpHandler),
      () => this.container.removeEventListener("touchstart", touchStartHandler),
      () => document.removeEventListener("touchmove", touchMoveHandler),
      () => document.removeEventListener("touchend", touchEndHandler),
      () => window.removeEventListener("resize", resizeHandler),
    )
  }

  cleanup() {
    for (const cleanup of this.cleanups) {
      cleanup()
    }
  }

  private setupNavigationControls() {
    const controls = document.createElement("div")
    controls.className = "diagram-controls"

    // Zoom controls
    const zoomIn = this.createButton("+", () => this.zoom(0.1))
    const zoomOut = this.createButton("-", () => this.zoom(-0.1))
    const resetBtn = this.createButton("Reset", () => this.resetTransform())

    controls.appendChild(zoomOut)
    controls.appendChild(resetBtn)
    controls.appendChild(zoomIn)

    this.container.appendChild(controls)
    this.cleanups.push(() => controls.remove())
  }

  private createButton(text: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement("button")
    button.textContent = text
    button.className = "diagram-control-button"
    button.addEventListener("click", onClick)
    window.addCleanup(() => button.removeEventListener("click", onClick))
    return button
  }

  private onMouseDown(e: MouseEvent) {
    if (e.button !== 0) return // Only handle left click
    e.preventDefault()
    this.isDragging = true
    this.startPan = { x: e.clientX - this.currentPan.x, y: e.clientY - this.currentPan.y }
    this.container.style.cursor = "grabbing"
    // Disable the transition while actively dragging: otherwise every
    // mousemove restarts a 0.1s animation, so the view keeps lagging behind
    // the cursor instead of tracking it directly.
    this.content.style.transition = "none"
  }

  private onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return
    e.preventDefault()

    this.currentPan = {
      x: e.clientX - this.startPan.x,
      y: e.clientY - this.startPan.y,
    }

    this.updateTransform()
  }

  private onMouseUp() {
    if (!this.isDragging) return
    this.isDragging = false
    this.container.style.cursor = "grab"
    this.content.style.transition = ""
  }

  private onTouchStart(e: TouchEvent) {
    if (e.touches.length !== 1) return
    this.isDragging = true
    const touch = e.touches[0]
    this.startPan = { x: touch.clientX - this.currentPan.x, y: touch.clientY - this.currentPan.y }
    this.content.style.transition = "none"
  }

  private onTouchMove(e: TouchEvent) {
    if (!this.isDragging || e.touches.length !== 1) return
    e.preventDefault() // Prevent scrolling

    const touch = e.touches[0]
    this.currentPan = {
      x: touch.clientX - this.startPan.x,
      y: touch.clientY - this.startPan.y,
    }

    this.updateTransform()
  }

  private onTouchEnd() {
    this.isDragging = false
    this.content.style.transition = ""
  }

  private onWheel(e: WheelEvent) {
    e.preventDefault()
    // Scrolling up (negative deltaY) zooms in, scrolling down zooms out.
    const delta = -e.deltaY * 0.0015
    this.zoomAt(delta, e.clientX, e.clientY)
  }

  private zoom(delta: number) {
    // The +/- buttons zoom around the middle of the visible area.
    const rect = this.container.getBoundingClientRect()
    this.zoomAt(delta, rect.left + rect.width / 2, rect.top + rect.height / 2)
  }

  // Zooms in/out while keeping whatever is under (clientX, clientY) fixed on
  // screen, so the point the user is pointing at doesn't drift away.
  private zoomAt(delta: number, clientX: number, clientY: number) {
    const newScale = Math.min(Math.max(this.scale + delta, this.minScale), this.MAX_SCALE)
    if (newScale === this.scale) return

    const rect = this.container.getBoundingClientRect()
    const offsetX = clientX - rect.left
    const offsetY = clientY - rect.top
    const ratio = newScale / this.scale

    this.currentPan = {
      x: offsetX - (offsetX - this.currentPan.x) * ratio,
      y: offsetY - (offsetY - this.currentPan.y) * ratio,
    }

    this.scale = newScale
    this.updateTransform()
  }

  private updateTransform() {
    this.content.style.transform = `translate(${this.currentPan.x}px, ${this.currentPan.y}px) scale(${this.scale})`
  }

  private resetTransform() {
    const target = this.content.querySelector("svg, img")
    if (!target) return

    const rect = target.getBoundingClientRect()
    const naturalWidth = rect.width / this.scale
    const naturalHeight = rect.height / this.scale
    if (naturalWidth === 0 || naturalHeight === 0) return

    // Start zoomed out just enough to show the whole diagram, centered, so
    // the user always sees everything first and can then zoom/pan freely
    // from there. We also lower the minimum zoom-out level to match, so
    // "zoom out" can always get back to this fitted view.
    const fitScale = Math.min(
      this.container.clientWidth / naturalWidth,
      this.container.clientHeight / naturalHeight,
    )
    this.minScale = Math.min(0.5, fitScale)
    // Never auto-upscale past the diagram's natural size on first view.
    this.scale = Math.min(fitScale, 1)

    const width = naturalWidth * this.scale
    const height = naturalHeight * this.scale

    this.currentPan = {
      x: (this.container.clientWidth - width) / 2,
      y: (this.container.clientHeight - height) / 2,
    }
    this.updateTransform()
  }
}
