const TAB_BUTTON = document.createRange().createContextualFragment(`
    <button class='code-tabs__tab'></button>
`)

class CodeTabs {
    /** @param {HTMLElement} el */
    constructor(el) {
        this.el = el
    }
    connectedCallback() {
        this.tabs = this.el.querySelectorAll('code-tab')
        /** @type {HTMLElement} */
        const nav = document.createElement('NAV')
        for (const tab of this.tabs) {
            /** @type {HTMLButtonElement} */
            const button = TAB_BUTTON.firstElementChild.cloneNode()
            button.dataset.tab = tab.dataset.tab
            button.innerText = tab.dataset.tab
            button.onclick = this.onTabClick.bind(this)
            tab.button = button
            nav.appendChild(button)
            this.toggleTab(tab, true)
        }
        this.toggleTab(this.tabs[0], false)
        this.el.prepend(nav)
        this.el.classList.add('code-tabs__initialized')
    }
    /** @param {MouseEvent} e */
    onTabClick(e) {
        const id = e.target.dataset.tab
        for (const tab of this.tabs) {
            this.toggleTab(tab, tab.dataset.tab !== id)
        }
    }
    /** 
     * @param {HTMLElement} tab
     * @param {boolean} hidden
     */
    toggleTab(tab, hidden) {
        if (hidden) {
            tab.setAttribute('hidden', 'hidden')
        } else {
            tab.removeAttribute('hidden')
        }
        tab.button.classList.toggle('active', !hidden)
    }
}

// Edge does not support custom elements V1
for (const el of document.querySelectorAll('code-tabs')) {
    const instance = new CodeTabs(el)
    instance.connectedCallback()
}