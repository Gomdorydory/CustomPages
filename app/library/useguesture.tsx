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
  let [textcrop, setTextCrop] = useState<settext>({id: props.props.id, x: '50vw', y: '50vh', scale:1, rotation: 0, fontSize: 100, fontColor: 'black', textalign: 'left', fontFamily: 'Cafe24Shiningstar'});
  let TextRef = useRef<HTMLDivElement>(null);
  //console.log(textcrop)
  let [offset, SetOffset] = useState([0,0]);

  let lastPosition: React.MutableRefObject<number> = useRef(0);
  let firstTime: React.MutableRefObject<number> = useRef(0);
  useGesture(
    {
      onDrag: (offset) => {
      if(firstTime.current == 0) {
        let resultX :number
        let resultY : number
      if (TextRef.current) {
        resultX = offset.xy[0]- Number(TextRef.current.offsetWidth)*50/100
        resultY = offset.xy[1]- Number(TextRef.current.offsetHeight)*50/100
        offset.offset[0] = resultX
        offset.offset[1] = resultY
        setTextCrop({...textcrop, x: resultX, y:resultY})
      }
      }else {
        setTextCrop({...textcrop, x: offset.offset[0], y:offset.offset[1]})
      }
      },
      onPinch: (offset) => {

        let NewAngle = offset.da[1] + 90 //각도가 이상하게 먹혀서 90도를 더해준다.
      //터치 방향에 따라 음수가 나오는 경우가 있어서, 같은 각도를 양수로 표현해준다.
      if(NewAngle >= 360){
          NewAngle= NewAngle % 360
      } 
      if (NewAngle < 0) {
        NewAngle = Math.abs(NewAngle)
        NewAngle= NewAngle % 360
        NewAngle = -1*NewAngle
        NewAngle+=360
      }
      //터치up하면 lastPostion이 0이된다. 그래서, 첫번째로 터치한 부분을 기준점으로 만들 수 있다.
      //터치up을 하지 않고 계속 하는 경우에만, lastposition값이 생긴다. 
      //처음터치가 90 이면, 떼지않고 이동하여 91이 될 때 변화량은 1이된다.
      if(lastPosition.current == 0) {
        lastPosition.current = NewAngle
      } else {
        //lastPosition을 이용하여, 현재 각도에서 이전 각도를 뺀다.
        let resultAngle = NewAngle - lastPosition.current
        //그 변화량 만큼만 이전 각도에 더해준다.
        setTextCrop((textcrop)=> ({...textcrop, scale: offset.offset[0], rotation: resultAngle+textcrop.rotation}))
      lastPosition.current = NewAngle
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
          <div
            ref={TextRef} 
            style={{
              position: "absolute",
              left: textcrop.x,
              top: textcrop.y,
              transform: `scale(${textcrop.scale}) rotate(${textcrop.rotation}deg`,
              touchAction: "none",
              fontSize: `${textcrop.fontSize}px`,
              color: textcrop.fontColor,
              overflow: 'hidden',
              wordWrap: 'normal',
              maxWidth: 580,
              fontFamily: textcrop.fontFamily,
              textAlign: textcrop.textalign
            }}
            draggable="false"
            onDoubleClick={()=>setIsEdit(true)}
            onMouseDown={()=>setIsDragged(true)}
            onMouseUp={()=>setIsDragged(false)}
            onTouchEnd={()=>{lastPosition.current = 0
              firstTime.current += 1}}
            onClick={(e)=>SetOffset([e.nativeEvent.offsetX, e.nativeEvent.offsetY])}
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