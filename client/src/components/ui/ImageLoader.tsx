import React, { useCallback, useRef, useState } from "react"

import PageLoader from "./PageLoader"

export type ImageLoaderProps = React.PropsWithChildren<{
  imageUrls: string[]
}>

const ImageLoader = ({ children, imageUrls }: ImageLoaderProps) => {
  const [allLoaded, setAllLoaded] = useState(false)
  const loadedCountRef = useRef(0)

  const onLoad = useCallback(() => {
    loadedCountRef.current += 1
    if (loadedCountRef.current >= imageUrls.length) {
      setAllLoaded(true)
    }
  }, [imageUrls, loadedCountRef, setAllLoaded])

  return (
    <>
      {allLoaded ? (
        children
      ) : (
        <div>
          <PageLoader message="Loading assets..." />
          <div style={{ display: "none" }}>
            {imageUrls.map(url => (
              <img key={url} onError={onLoad} onLoad={onLoad} src={url} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ImageLoader
