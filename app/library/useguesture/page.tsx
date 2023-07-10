'use client'

import { useRef, useState } from "react"
import { useGesture } from "@use-gesture/react"

export default function Home() {
  return (
    <>
      <ImageCropper src={'https://yourheartbadge.co.kr/web/product/tiny/attachment005.jpg'}/>
    </>
  )
}

interface propstype {
  src: string
}

function ImageCropper(props:propstype){
  let [crop, setCrop] = useState({ x: 0, y: 0, scale:1});
  let imageRef = useRef<HTMLImageElement>(null);
  useGesture(
    {
      onDrag: ({offset: [dx, dy]}) => {
        setCrop({...crop, x: dx, y:dy})
        console.log(crop.x)
        console.log(crop.y)
      },
      onPinch: ({offset: [d]}) => {
        setCrop((crop)=> ({...crop, scale: d}))
      },
    }
    ,
    {
      target: imageRef,
    }
  )
  return (
    <>
      <div className="useguesture-container">
        <div>
          <img 
            src={props.src}
            ref={imageRef}
            style={{
              position: "absolute",
              left: crop.x,
              top: crop.y,
              transform: `scale(${crop.scale})`,
              touchAction: "none",
            }}
            draggable="false"
          >

          </img>
        </div>
      </div>
    </>
  )
}