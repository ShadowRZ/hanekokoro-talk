const match = window.matchMedia('(prefers-color-scheme: dark)')

export function registerThemeHandler (): void {
  match.addEventListener('change', themeHandler)
}

export function removeThemeHandler (): void {
  match.removeEventListener('change', themeHandler)
}

function themeHandler (event: MediaQueryListEvent | MediaQueryList): void {
  if (event.matches) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
