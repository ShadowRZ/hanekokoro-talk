import { characters } from '../store/character'
import { messages } from '../store/messages'
import type { Character, Content, TalkSession } from '../types'
import { get } from './indexeddb'

async function readFile (
  action: (reader: FileReader) => void
): Promise<string | ArrayBuffer> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      resolve(reader.result!)
    }
    reader.onerror = (e) => {
      reject(e)
    }
    action(reader)
  })
}

export async function readFileAsUrl (file: File): Promise<string> {
  return (await readFile((reader) => {
    reader.readAsDataURL(file)
  })) as string
}

export async function resizeImageAsUrl (
  file: File,
  maxWidth: number
): Promise<string> {
  const dataUrl = await readFileAsUrl(file)
  return await new Promise((resolve) => {
    const img = document.createElement('img')
    img.onload = () => {
      let width = img.width
      let height = img.height
      const factor = Math.min(1, maxWidth / width)
      width *= factor
      height *= factor

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/webp'))
    }
    img.src = dataUrl
  })
}

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

export async function selectImage (): Promise<File | undefined> {
  return await new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = () => {
      const files = input.files
      if (files != null) {
        resolve(files[0])
      } else {
        resolve(undefined)
      }
    }
    input.click()
  })
}

export function contentString (content?: Content): string | undefined {
  if (content === undefined) return undefined
  switch (content.type) {
    case 'text':
      return content.content
    case 'image':
      return '[Image]'
    case 'sticker':
      return '[Sticker]'
  }
}

export function setup (): void {
  void (async () => {
    const charactersValue = await get('characters') as Character[]
    const messagesValue = await get('messages') as TalkSession[]

    characters.set(charactersValue ?? [])
    messages.set(messagesValue ?? [])
  })()
}
