const style = document.createElement('style')
style.textContent = /*css*/`
  .bg-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.5);
    opacity: 0.5;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, transparent, var(--dark-bg1) 75%);
  }

  .light-theme .overlay {
    background: linear-gradient(180deg, transparent, var(--light-bg1) 75%);
  }
`

const template = document.createElement('template')
template.innerHTML = /*html*/`
  <video class="bg-video" src="https://videos.pexels.com/video-files/8100337/8100337-uhd_2732_1440_25fps.mp4" preload="metadata" crossorigin playsinline muted autoplay loop></video>
  <div class="overlay"></div>
`
export default class BackgroundVideo extends HTMLElement {
  constructor() {
    super()
    this.appendChild(style.cloneNode(true))
    this.appendChild(template.content.cloneNode(true))

    this.classList.add(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : 'light-theme')
    window.addEventListener('theme-changed', (e) => {
      if (e.detail === 'dark-theme') {
        this.classList.replace('light-theme', 'dark-theme')
      }
      else {
        this.classList.replace('dark-theme', 'light-theme')
      }
    })
  }
}

customElements.define('background-video', BackgroundVideo)