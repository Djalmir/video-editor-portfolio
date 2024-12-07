import "/components/componentElements/AppHeader/ProfileBadge"

const style = document.createElement('style')
style.textContent = /*css*/`
  header {
    position: relative;
    width: 100%;
    user-select: none;
    -webkit-user-drag: none;
  }
`

const template = document.createElement('template')
template.innerHTML = /*html*/`
  <header>
    <profile-badge></profile-badge>
    <div class="contacts">
      <!--todo-->
    </div>
  </header>
`
export default class AppHeader extends HTMLElement {
  constructor() {
    super()
    this.appendChild(style.cloneNode(true))
    this.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('app-header', AppHeader)