class ScrollChange {
  constructor({ 
    elem = '.sc', 
    trigger = 50,
    classes = 'scrolled',
    offset = 0,
    removeClass = false,
    endPoint = null
  } = {}) {
    this.elem = elem
    this.trigger = trigger
    this.classes = classes
    this.offset = offset
    this.removeClass = removeClass
    this.endPoint = endPoint
    this.latestScrollPosition = 0
    
    this.ticking = false
    this.requestTick = this.requestTick.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.update = this.update.bind(this)
  }
  
  get init () {
    return this.initialize
  }
  
  onScroll () {
    this.latestScrollPosition = window.scrollY
    this.requestTick()
  }
  
  update () {
    const { 
      elem, 
      trigger, 
      classes, 
      offset, 
      removeClass, 
      endPoint, 
    } = this
    const elemToChange = this.getNode(elem)
    const triggerPoint = this.setPoint(trigger, offset)
    const cls = classes.split(' ')
    const currentScroll = this.latestScrollPosition
    
    this.ticking = false
    
    const classesHandler = (inverted = false) => inverted 
      ? elemToChange.classList.remove(...cls)
      : elemToChange.classList.add(...cls)
    
    if (endPoint) {
      const endTrigger = this.setPoint(endPoint)
      if (currentScroll >= triggerPoint && currentScroll <= endTrigger) {
        classesHandler(removeClass)
      } else {
        classesHandler(!removeClass)
      }
    } else {
      if (currentScroll >= triggerPoint) {
        classesHandler(removeClass)
      } else {
        classesHandler(!removeClass)
      }
    }
  }
  
  requestTick () {
    if (!this.ticking) requestAnimationFrame(this.update)
    this.ticking = true
  }
  
  initialize () {
    const elemToChange = this.getNode(this.elem)
    
    if (elemToChange) {
      window.addEventListener('scroll', this.onScroll, false)
      window.addEventListener('resize', this.onScroll, false)
    } else {
      console.error(`
        There's no DOM element that match "${elem}".
        See the "elem" declaration in ScrollChange Options.
      `)
    }
  }
  
  setPoint (elem, offset = 0) {
    if (isNaN(elem)) {
      const el = this.getNode(elem)
      const diff = el.getBoundingClientRect().top + this.latestScrollPosition - el.offsetHeight + offset
      return diff > 0 ? diff : elem.offsetHeight
    } else {
      return elem
    }
  }
  
  getNode (node) {
    return node.nodeType === 1 ? node : document.querySelector(node)
  }
  
}

export default ScrollChange
