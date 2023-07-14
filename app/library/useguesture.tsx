'use client'

import React, { useRef, useState, useContext, useEffect} from "react"
import { listDataContext } from "../plus"
import { useDrag, useGesture } from "@use-gesture/react"
import Text from "../create/text"
import { types, PlusInfo } from "../plus"
import { createContext } from "vm"

'https://yourheartbadge.co.kr/web/product/tiny/attachment005.jpg'

export function ImageCropper(props:PlusInfo){
  let [isEdit, setIsEdit] = useState<boolean>(false);
  let [isDragged, setIsDragged] = useState<boolean>(false);

  let [crop, setCrop] = useState({ x: 0, y: 0, scale:1, rotation: 0});
  let imageRef = useRef<HTMLImageElement>(null);
  useGesture(
    {
      onDrag: ({offset}) => {
        setCrop({...crop, x: offset[0], y:offset[1]})
      },
      onPinch: (offset) => {
        console.log( 90 + offset.da[1]+'도');
        setCrop((crop)=> ({...crop, scale: offset.offset[0], rotation: offset.da[1]+90}))
        if(imageRef.current){
      }
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
            src=''
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

interface settext {
  id : string|undefined,
  x: string|number,
  y: string|number,
  scale: number,
  rotation: number
}

export type FunctionArray = Array<React.Dispatch<React.SetStateAction<boolean>>>

export let settingFuncContext = React.createContext<FunctionArray | undefined>(undefined);

export let settingDataContext = React.createContext<boolean | undefined>(undefined);

export function TextCropper(props:any){
  let list:any = useContext(listDataContext);

  let [isEdit, setIsEdit] = useState<boolean>(false);
  let [isDragged, setIsDragged] = useState<boolean>(false);
  let [textcrop, settextCrop] = useState<settext>({id: list[0].id, x: 0, y: 0, scale:1, rotation: 0});

  let TextRef = useRef<HTMLDivElement>(null);

  useGesture(
    {
      onDrag: ({offset}) => {
        settextCrop({...textcrop, x: offset[0], y:offset[1]})
      },
      onPinch: (offset) => {
        settextCrop((textcrop)=> ({...textcrop, scale: offset.offset[0], rotation: offset.da[1]+90}))
        if(TextRef.current){
      }
      },
    }
    ,
    {
      target: TextRef,
    }
  )

  const settingFunction: FunctionArray = [
    setIsDragged,
    setIsEdit
  ]
  
  return (
    <>
      {isEdit?
        <settingDataContext.Provider value={isEdit}>
          <settingFuncContext.Provider value={settingFunction}>
            <Text props={props.props}/>
          </settingFuncContext.Provider>
        </settingDataContext.Provider>
      :
        <div className="useguesture-container">
          <div 
            ref={TextRef} 
            style={{
              position: "absolute",
              left: textcrop.x,
              top: textcrop.y,
              transform: `scale(${textcrop.scale}) rotate(${textcrop.rotation}deg)`,
              touchAction: "none",
            }}
            draggable="false"
            onDoubleClick={()=>setIsEdit(true)}
            onMouseDown={()=>setIsDragged(true)}
            onMouseUp={()=>setIsDragged(false)}
          >
            {props.props.content}
          </div>
          {isDragged?
          <div className="trash-can">드래그 중입니다.</div>
          :
          <></>
          }
        </div>
      }
    </>
  )
}