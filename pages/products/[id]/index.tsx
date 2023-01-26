// import ImageGallery from 'react-image-gallery'
import Carousel from 'nuka-carousel/lib/carousel'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import CustomEditor from '@components/Editor'
import { useRouter } from 'next/router'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1016/1000/600/',
    thumbnail: 'https://picsum.photos/id/1016/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1013/1000/600/',
    thumbnail: 'https://picsum.photos/id/1013/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1012/1000/600/',
    thumbnail: 'https://picsum.photos/id/1012/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1011/1000/600/',
    thumbnail: 'https://picsum.photos/id/1011/250/150/',
  },
]

export default function Products() {
  const [index, setIndex] = useState(0)
  const router = useRouter()
  const { id: productId } = router.query

  const [editorState, SetEditorState] = useState<EditorState | undefined>(
    undefined
  )

  useEffect(() => {
    if (productId != null) {
      fetch(`http://localhost:3000/api/get-product?id=${productId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.items.contents) {
            SetEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents))
              )
            )
          } else {
            SetEditorState(EditorState.createEmpty())
          }
        })
    }
  }, [productId])

  return (
    <>
      <Carousel
        animation="fade"
        withoutControls={true}
        autoplay
        wrapAround
        speed={10}
        slideIndex={index}
      >
        {images.map((item) => (
          <Image
            key={item.original}
            src={item.original}
            alt="image"
            width={1000}
            height={600}
          />
        ))}
      </Carousel>
      <div style={{ display: 'flex' }}>
        {images.map((item, idx) => (
          <div key={idx} onClick={() => setIndex(idx)}>
            <Image src={item.original} alt="image" width={100} height={60} />
          </div>
        ))}
      </div>
      {editorState != null && (
        <CustomEditor editorState={editorState} readOnly />
      )}
    </>
  )
}
