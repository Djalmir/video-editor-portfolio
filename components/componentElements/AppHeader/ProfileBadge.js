import "/components/componentElements/ProfileBadge/ProfilePicture"

const style = document.createElement('style')
style.textContent = /*css*/`
  .badge {
    position: relative;
    top: 7px;
    left: 17px;
    width: 297px;
    max-width: calc(90vw - 17px);
    color: var(--dark-font1);
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .light-theme .badge {
    color: var(--light-font1);
  }

  .badge > * {
    z-index: 1;
  }

  .picture-wrapper {
    margin-top: auto;
    z-index: 1;
  }

  .picture {
    margin-left: -7px;
    filter: drop-shadow(5px -1px 1px var(--primary-transparent));
  }

  .nameTag {
    margin-top: -4px;
    width: 333px;
    max-width: calc(100vw - 33px);
    padding: 7px;
    border-radius: .5rem;
    background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
    box-shadow: var(--dark-box-shadow), inset 1px 1px 1px var(--dark-bg4);
  }

  .light-theme .nameTag {
    background: linear-gradient(170deg, var(--light-bg3), var(--light-bg1));
    box-shadow: var(--light-box-shadow), inset 1px 1px 1px var(--light-bg4);
  }

  .nameTag h1 {
    font-size: 1.5rem;
    background: linear-gradient(to bottom, var(--dark-font1), var(--primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(1px 1px 0px var(--dark-bg1));
  }

  .light-theme .nameTag h1 {
    background: linear-gradient(to bottom, var(--dark-font1), var(--primary-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(1px 1px 0px var(--primary));
  }

  .nameTag sup {
    display: block;
    padding: 7px 0 0 7px;
    font-size: .8rem;
  }

  .resume {
    height: fit-content;
    flex: 1;
    padding: 0 17px 17px;
    margin-top: auto;
    z-index: 0;
    position: relative;
  }

  .resume::before {
    content: '';
    position: absolute;
    top: -17vh;
    left: 7px;
    width: 100%;
    height: calc(100% + 17vh);
    background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
    border-radius: .5rem;
    box-shadow: var(--dark-box-shadow), inset 1px 1px 1px var(--dark-bg4);
    z-index: -1;
  }

  .light-theme .resume::before {
    background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
    box-shadow: var(--light-box-shadow), inset 1px 1px 1px var(--light-bg4);
  }

  .resume h2 {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 7px 0;
    text-align: center;
  }

  .resume ul {
    margin-top: 17px;
    padding-left: 17px;
    list-style: circle;
    font-weight: 400;
    line-height: 1.1rem;
    font-size: .8rem;
  }

  .resume ul li {
    margin-bottom: 7px;
  }

  @media (min-width: 640px) {
    .badge {
      width: 804px;
    }

    .resume {
      padding: 17px 17px 0;
    }

    .resume::before {
      top: 7px;
      left: -333px;
      width: calc(100% + 333px);
      height: 100%;
    }
  }

  @media (min-width: 847px) {
    .resume h2 {
      text-align: right;
    }

    .resume ul li {
      margin-left: auto;
      width: fit-content;
    }
  }
  
`

const template = document.createElement('template')
template.innerHTML = /*html*/`
  <div class="badge">
    <div class="picture-wrapper">
      <profile-picture class="picture"></profile-picture>
      <div class="nameTag">
        <h1>Hosama Miodutzki</h1>
        <sup>Editora de vídeos e criadora de conteúdo audiovisual</sup>
        <!--  <p>Com uma paixão por contar histórias através de imagens e som, tenho me dedicado à criação de vídeos dinâmicos e de alta qualidade. Minha experiência no DaVinci Resolve me permite realizar edições precisas e criativas, desde cortes simples até correção de cor, design de som e efeitos visuais.</p>
          <p>Como criadora de conteúdo no YouTube, desenvolvi um olhar atento para a criação de vídeos envolventes, capazes de capturar e reter a atenção do público.</p>
          <p>Estou sempre em busca de novas oportunidades para expandir minhas habilidades e colaborar em projetos criativos. Se você está procurando uma editora comprometida, detalhista e apaixonada pelo que faz, ficarei feliz em ajudar a transformar suas ideias em realidade.</p>
        -->
      </div>
    </div>    
    <div class="resume">
      <h2>Pós-produção audiovisual</h2>
      <ul>
        <li>Edição de vídeos para redes sociais</li>
        <li>Criação de conteúdo educacional e de entretenimento</li>
        <li>Motion graphics e transições personalizadas</li>
        <li>Ajustes de cor avançados</li>
      </ul>
    </div>
  </div>
`
export default class ProfileBadge extends HTMLElement {
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

customElements.define('profile-badge', ProfileBadge)