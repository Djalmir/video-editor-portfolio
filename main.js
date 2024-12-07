import "/components/uiElements/BackgroundVideo"
import "./components/uiElements/AppHeader"
import "./components/uiElements/SmartphoneSection"
import { dispatchEvent } from "./utils/events"

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

if (!prefersDark.matches) {
  changeTheme()
}

prefersDark.addEventListener('change', () => {
  changeTheme()
})

// fetch(`${import.meta.env.VITE_BASE_URL}auth/access`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     app: location.host,
//     browser: navigator.userAgent,
//     language: navigator.language
//   })
// })

function changeTheme() {
  setTimeout(() => {
    dispatchEvent('theme-changed', prefersDark.matches ? 'dark-theme' : 'light-theme')
    if (prefersDark.matches) {
      document.documentElement.classList.replace('light-theme', 'dark-theme')
      document.querySelector("[name=theme-color]").setAttribute("content", "#1b1b1b")
      document.querySelector("link[rel='icon']").setAttribute("href", "/logo.svg")
    }
    else {
      document.documentElement.classList.replace('dark-theme', 'light-theme')
      document.querySelector("[name=theme-color]").setAttribute("content", "#dddddd")
      document.querySelector("link[rel=icon]").setAttribute("href", "/white-logo.svg")
    }
  }, 0)
}