export default class LazyLoad {
    constructor({
        ele=window,
        selector='img[data-src]',
        clientHeight=document.documentElement.clientHeight,
        offset=80
    } = {}) {
        this.selector = selector
        this.offset = offset
        this.clientHeight = clientHeight
        this.scroll = this.__scroll.bind(this)
        ele.addEventListener('scroll', this.scroll, false)
        this.scroll()
    }

    __scroll() {
        Array.from(document.querySelectorAll(this.selector)).forEach(ele => {
            const   rect = ele.getBoundingClientRect(),
                    src = ele.dataset.src || ''
            if(src.trim() && rect.top <= (this.clientHeight + this.offset) && (rect.top >= 0 || rect.bottom >= 0)) {
                const img = new Image()
                img.onload = () => {
                    if(ele.classList) ele.classList.remove('lazyload')
                    if(ele.nodeName.toLowerCase() === 'img')
                        ele.src = src
                    else
                        ele.style.backgroundImage = `url(${src})`
                }
                img.src = src
                delete ele.dataset.src
            }
        })
    }

}