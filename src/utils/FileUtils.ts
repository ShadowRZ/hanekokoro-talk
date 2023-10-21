async function readFile (action: (reader: FileReader) => void): Promise<string | ArrayBuffer> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result!) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    reader.onerror = e => reject(e)
    action(reader)
  })
}

export async function readFileAsUrl (file: File): Promise<string> {
  return await readFile(reader => reader.readAsDataURL(file)) as string
}

export async function resizeImageAsUrl (file: File, maxWidth: number): Promise<string> {
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
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.src = dataUrl
  })
}
