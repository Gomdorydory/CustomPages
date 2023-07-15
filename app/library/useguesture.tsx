'use client'

import React, { useRef, useState, useContext, useEffect} from "react"
import { listDataContext } from "../plus"
import { useDrag, useGesture } from "@use-gesture/react"
import Text from "../create/text"
import { types, PlusInfo } from "../plus"

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

//textcrop
type textalign = 'center' | 'left' | 'right' | 'justify'
interface settext {
  id : string|undefined,
  x: string|number,
  y: string|number,
  scale: number,
  rotation: number,
  fontSize?: number,
  fontColor?: string,
  textalign?: textalign,
  fontFamily: string,
}

export type FunctionArray = Array<React.Dispatch<React.SetStateAction<boolean>>| React.Dispatch<React.SetStateAction<settext>>>
export let TextsettingFuncContext = React.createContext<FunctionArray | undefined>(undefined);

export type DataArray = Array<boolean | undefined | number | settext>
export let TextsettingDataContext = React.createContext<DataArray | undefined>(undefined);

export function TextCropper(props:any){
  let list:any = useContext(listDataContext);

  //setting-mode
  let [isEdit, setIsEdit] = useState<boolean>(true);
  let [isDragged, setIsDragged] = useState<boolean>(false);
  let [textcrop, setTextCrop] = useState<settext>({id: props.props.id, x: 0, y: 0, scale:1, rotation: 0, fontSize: 100, fontColor: 'black', textalign: 'left', fontFamily: 'Cafe24Shiningstar'});
  let TextRef = useRef<HTMLTextAreaElement>(null);
  console.log(textcrop)


  useGesture(
    {
      onDrag: ({offset}) => {
        setTextCrop({...textcrop, x: offset[0], y:offset[1]})
      },
      onPinch: (offset) => {
        setTextCrop((textcrop)=> ({...textcrop, scale: offset.offset[0], rotation: offset.da[1]+90}))
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
    setIsEdit,
    setTextCrop
  ]

  const settingData: DataArray = [
    isEdit, textcrop
  ]
  
  return (
    <>
      {isEdit?
        <TextsettingDataContext.Provider value={settingData}>
          <TextsettingFuncContext.Provider value={settingFunction}>
            <Text props={props.props}/>
          </TextsettingFuncContext.Provider>
        </TextsettingDataContext.Provider>
      :
        <div className="useguesture-container">
          <textarea
            ref={TextRef} 
            readOnly
            style={{
              position: "absolute",
              left: textcrop.x,
              top: textcrop.y,
              transform: `scale(${textcrop.scale}) rotate(${textcrop.rotation}deg)`,
              touchAction: "none",
              fontSize: `${textcrop.fontSize}px`,
              color: textcrop.fontColor,
              overflow: 'hidden',
              wordWrap:'break-word',
              maxWidth: 580,
              fontFamily: textcrop.fontFamily,
              textAlign: textcrop.textalign
            }}
            draggable="false"
            onDoubleClick={()=>setIsEdit(true)}
            onMouseDown={()=>setIsDragged(true)}
            onMouseUp={()=>setIsDragged(false)}
          >
            {props.props.content}
          </textarea>
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