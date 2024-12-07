import "/components/uiElements/Smartphone"

const style = document.createElement('style')
style.textContent = /*css*/`
  section {
    min-height: 50vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 17px;
    align-items: center;
    padding: 33px 17px;
    position: relative;
  }

  .smartphoneMessage {
    flex: 1;
    min-width: 240px;
    padding: 33px 7px;
    font-weight: bold;
    text-align: center;
    position: relative;
  }

  .smartphoneMessage p {
    position: absolute;
    inset: 0;
    font-size: .85rem;
  }

  .oldMessage {
    animation: hide-message 1s ease-in 1;
  }

  @keyframes hide-message {
    100% {
      transform: translateY(-100px) translateX(50%) scale(0);
      opacity: 0;
    }
  }

  .newMessage {
    animation: show-message 1s ease-out 1;
  }

  @keyframes show-message {
    0% {
      transform: translateY(100px) translateX(-10%) scale(1.1);
      opacity: 0;
    }
  }

  .smartphoneWrapper {
    flex: 1;
    min-width: 240px;
    min-height: 330px;
    position: relative;
  }

  smartphone-3d {
    position: absolute;
    bottom: 50%;
    right: 130px;
    scale: .6;
    opacity: 0;
  }

  smartphone-3d.visible {
    animation: appear-from-left 1.5s ease-out 1;
    opacity: 1;
    z-index: 1;
    /*filter: drop-shadow(5px 5px 5px var(--dark-bg1-transparent));*/
  }
  
  smartphone-3d video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 17px;
    object-fit: cover;
  }

  smartphone-3d video::-webkit-media-controls-fullscreen-button {
    display: none;
  }
  
  smartphone-3d.visible::part(phone) {
    animation: rotate-to-left 2s linear 1;
  }

  @media (min-width: 400px) {
    .smartphoneMessage p {
      font-size: 1rem;
    }
  }

  @media (min-width: 800px) {
    .smartphoneMessage {
      flex: 2.7;
      text-align: right;
    }

    .smartphoneMessage p {
      font-size: 1.2rem;
    }
  }

  @media (min-width: 1180px) {
    /*header {
      height: 100lvh;
    }*/

    smartphone-3d {
      right: 170px;
      bottom: 250px;
      scale: .8;
    }
  }

  @media (min-width: 1417px) {
    .smartphoneMessage {
      flex: 3.7;
    }
  }
`

const template = document.createElement('template')
template.innerHTML = /*html*/`
  <section>
    <div class="smartphoneMessage"></div>
    <div class="smartphoneWrapper">
      <smartphone-3d id="smartphone" transform='{ "rotateX": 35, "rotateY": -15, "rotateZ": 10 }'>
        <iframe id="youtubeVideo" width="300" height="627" src="https://www.youtube.com/embed/UzR87WcC_pU?si=2kgFFu-M2m7LSZI4&showinfo=0&modestbranding=1&rel=0&autoplay=1&loop=1&playlist=UzR87WcC_pU" title="YouTube video player" frameborder="0" referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </smartphone-3d>
    </div>
  </section>
`
export default class SmartphoneSection extends HTMLElement {
  constructor() {
    super()
    this.appendChild(style.cloneNode(true))
    this.appendChild(template.content.cloneNode(true))

    this.smartphoneMessage = this.querySelector('.smartphoneMessage')

    this.messages = [
      "Formatos de exportação otimizados para diferentes plataformas, como YouTube, Vimeo e redes sociais, garantindo a melhor qualidade possível dentro dos padrões técnicos exigidos.",
      "Cortes precisos e ajustes na linha do tempo para criar uma narrativa fluida e envolvente.",
      "Vídeos organizados e sincronizados de múltiplas câmeras para edições multicam, garantindo uma transição suave entre diferentes ângulos.",
      "Correção de cor detalhada. Ajustando contraste, saturação e temperatura para transmitir a atmosfera desejada.",
      "Ferramentas avançadas de color grading para criar looks cinematográficos e personalizados, alinhados à identidade visual do projeto.",
      "Efeitos visuais e gráficos em movimento.",
      "Gráficos em movimento, transições e efeitos especiais diretamente no Fusion, integrando elementos visuais que enriquecem a narrativa.",
      "Composições visuais complexas, incluindo sobreposição de texto, animações e efeitos, para melhorar o impacto visual dos vídeos.",
      "Mixagem e edição de áudio utilizando o Fairlight, garantindo que som e imagem estejam perfeitamente sincronizados e que a qualidade sonora esteja nítida.",
      "Equalização, compressão e redução de ruído para alcançar um áudio claro e equilibrado, seja para diálogos, música ou efeitos sonoros.",
      "Masterização final dos projetos, assegurando que a resolução e os codecs atendam às necessidades do cliente e do projeto."
    ]

    this.messageIndex = 0
    Object.defineProperty(this, 'messageIndex', {
      get() {
        return this._messageIndex
      },
      set(value) {
        this._messageIndex = value
        updateSmartphoneMessage()
      }
    })

    const updateSmartphoneMessage = () => {
      if (Array.from(this.smartphoneMessage.children).length > 1) {
        for (let i = 1; i < this.smartphoneMessage.children.length; i++) {
          console.log('limpando ' + i)
          try {
            this.smartphoneMessage.removeChild(this.smartphoneMessage.children[i])
          }
          catch { }
        }
      }
      let removingChild = this.smartphoneMessage.firstElementChild
      if (removingChild) {
        removingChild.addEventListener('animationend', () => {
          this.smartphoneMessage.removeChild(removingChild)
        })
        removingChild.classList.add('oldMessage')
      }

      let addingChild = document.createElement('p')
      addingChild.textContent = this.messages[this._messageIndex]
      addingChild.addEventListener('animationend', () => {
        addingChild.classList.remove('newMessage')
      })
      addingChild.classList.add('newMessage')
      this.smartphoneMessage.appendChild(addingChild)
    }
  }

  connectedCallback() {
    this.messageIndex = 0

    const observerOptions = {
      root: null, // Usa a viewport como root
      rootMargin: '0px',
      threshold: 0.1 // 10% do elemento visível para disparar
    }

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    observer.observe(document.querySelector('#smartphone'))

    setInterval(() => {
      this.messageIndex = (this.messageIndex + 1) % this.messages.length
    }, 7500)
  }
}

customElements.define('smartphone-section', SmartphoneSection)