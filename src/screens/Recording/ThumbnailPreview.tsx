import React, { useEffect, useState } from 'react'

const ThumbnailPreview = ({ blobUrl }: { blobUrl: string }) => {

  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = ''
    const reader = new FileReader()
    reader.onload = (event) => {
      setImageSrc(event.target.result)
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reader.readAsDataURL(link.href)
  }, [blobUrl])

  return imageSrc && <img src={imageSrc} alt="Preview" />
}

export default ThumbnailPreview
