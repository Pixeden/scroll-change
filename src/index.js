class ScrollChange {
  constructor({ 
    elem = '.sc', 
    trigger = 50,
    classes = 'scrolled',
    offset = 0,
    removeClass = false,
    endPoint = 0
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
    const { elem, endPoint, classes } = this
    const elemToChange = this.getNode(elem)
    const triggerPoint = this.setTrigger(elemToChange)
    const cls = classes.split(' ')
    const viewportHeight = this.getViewporHeight()
    const currentScroll = this.latestScrollPosition
    
    this.ticking = false
    
    if (endPoint !== 0) {
      if (currentScroll >= triggerPoint && currentScroll <= endPoint) {
        elemToChange.classList.add(...cls)
      } else {
        elemToChange.classList.remove(...cls)
      }
    } else {
      if (currentScroll >= triggerPoint) {
        elemToChange.classList.add(...cls)
      } else {
        elemToChange.classList.remove(...cls)
      }
    }
  }
  
  requestTick () {
    if (!this.ticking) {
      requestAnimationFrame(this.update)
    }
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
  
  setTrigger (elem) {
    const { trigger, offset } = this
    if (isNaN(trigger)) {
      const elem = this.getNode(trigger)
      const diff = elem.getBoundingClientRect().top + this.latestScrollPosition - elem.offsetHeight + offset
      // console.log({ 
      //   elemTop: elem.getBoundingClientRect().top,  
      //   latestScrollPosition: this.latestScrollPosition,
      //   elemOffsetHeight: elem.offsetHeight,
      //   offset,
      //   diff,
      // });
      return diff > 0 ? diff : elem.offsetHeight
    } else {
      return trigger
    }
  }
  
  setEndPoint () {
    const { endPoint } = this
    if (isNaN(endPoint)) {
      const elem = this.getNode(endPoint)
    } else {
      return endPoint
    }
  }
  
  getNode (node) {
    return node.nodeType === 1 ? node : document.querySelector(node)
  }
  
  getViewporHeight () {
  	return window.innerHeight || document.documentElement.clientHeight
  }
  
  scrollTop () {
    return window.pageYOffset || (
      document.documentElement && document.documentElement.scrollTop
    ) || document.body.scrollTop
  }
}

export default ScrollChange
