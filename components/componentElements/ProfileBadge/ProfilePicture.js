const style = document.createElement('style')
style.textContent = /*css*/`
  img {
    max-width: 230px;
    max-height: 40vh;
    aspect-ratio: 1/1;
    border-radius: .5rem;
    user-select: none;
    -webkit-user-drag: none;
  }

`

const template = document.createElement('template')
template.innerHTML = /*html*/`
  <img src="/assets/images/Zama.png" alt="Hosama's picture">
`
export default class ProfilePicture extends HTMLElement {
  constructor() {
    super()
    this.appendChild(style.cloneNode(true))
    this.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('profile-picture', ProfilePicture)