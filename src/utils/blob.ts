export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = ''
  const bytes: Uint8Array<ArrayBuffer> = new Uint8Array(buffer)
  const len: number = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

export const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve) => {
    const reader: FileReader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}