'use client'

import { useRef, useState } from "react"
import { useGesture } from "@use-gesture/react"

'https://yourheartbadge.co.kr/web/product/tiny/attachment005.jpg'

interface propstype {
  src: string|undefined
}

export function ImageCropper(props:propstype){
  let [isEdit, setIsEdit] = useState<boolean>(false);
  let [crop, setCrop] = useState({ x: 0, y: 0, scale:1});
  let imageRef = useRef<HTMLImageElement>(null);
  useGesture(
    {
      onDrag: ({offset: [dx, dy]}) => {
        setCrop({...crop, x: dx, y:dy})
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

export function TextCropper(props:propstype){
  let [isEdit, setIsEdit] = useState<boolean>(false);
  let [textcrop, settextCrop] = useState({ x: 0, y: 0, scale:1});
  let TextRef = useRef<HTMLDivElement>(null);
  useGesture(
    {
      onDrag: ({offset: [dx, dy]}) => {
        settextCrop({...textcrop, x: dx, y:dy})
      },
      onPinch: ({offset: [d]}) => {
        settextCrop((textcrop)=> ({...textcrop, scale: d}))
      },
    }
    ,
    {
      target: TextRef,
    }
  )
  return (
    <>
      <div className="useguesture-container">
        <div>
          {isEdit?
            <div>'수정중'</div>
          :
            <div 
              ref={TextRef}
              style={{
                position: "absolute",
                left: textcrop.x,
                top: textcrop.y,
                transform: `scale(${textcrop.scale})`,
                touchAction: "none",
              }}
              draggable="false"
              onDoubleClick={()=>{setIsEdit(true) 
                console.log(isEdit)}}
            >
              {props.src}
            </div>
          }

        </div>
      </div>
    </>
  )
}