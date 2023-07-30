'use client'

import React, { useRef, useState, useContext, useEffect} from "react"

import { listDataContext,listSettingContext } from "../plus"
import { useGesture } from "@use-gesture/react"

import Text from "../create/text"
import Map from "../create/map";

// 웹 사이트 디자인 알아보기 --> 디자인 수정 : 스크롤바 없는 버튼식 페이지 (페이지 넘기기는... 상단 버튼으로...)
// 페이지 이동 및 수정은 레퍼런스 찾아보기 (아마 프로크리에이트나 파워포인트 레이아웃 UI 따라하면 되지 않을까?)
// useGesture options에서 boundaries 알아보기
// 디자인은 직관적이고 간단하게! 복잡한 버튼 여러개X 너무 선택지 많이 주지 말고, 꼭 필요한 버튼만 만들기
// boundary를 이용하여 페이지 전체의 길이 설정해보기
// 버튼을 누르면 페이지 전체의 길이를 계속 추가할 수 있게 하기
// map 다중으로 부르기 vs 하나만 부를 수 있게 제한하기 (선택)
// 누르면 카피가 되는 div버튼 만들기

'https://yourheartbadge.co.kr/web/product/tiny/attachment005.jpg'
//----------------------imagecrop---------------------

export function ImageCropper(props:any){
  let list:any = useContext(listDataContext);
  let setList:any = useContext(listSettingContext)

  let [isEdit, setIsEdit] = useState<boolean>(false);
  let [isDragged, setIsDragged] = useState(false);

  let lastPosition: React.MutableRefObject<number> = useRef(0);
  let firstTime: React.MutableRefObject<number> = useRef(0);

  let [imagecrop, setImageCrop] = useState({ x: 0, y: 0, scale:1, rotation: 0});
  let imageRef = useRef<HTMLImageElement>(null);
  useGesture(
    {
      onDrag: (offset) => {
        setImageCrop({...imagecrop, x: offset.offset[0], y:offset.offset[1]})
      if(Number(offset.xy[0]) >= window.innerWidth*45/100 && 
      Number(offset.xy[0]) < window.innerWidth*55/100 && 
      Number(offset.xy[1]) > window.innerHeight*70/100 && 
      Number(offset.xy[1]) < window.innerHeight*80/100 && 
      isDragged) {
    // isDraggble == true 이면, 휴지통 컴포넌트의 색상 바꾸기
    // 의문: 현재 디바이스에 따라 좌표가 조금씩 바뀌는데 그것은 어떻게 처리하면 좋을까? 부등호는 숫자에만 쓸 수 있어서 자동적으로 px로 고정되어 있음. window.innerWidth 값을 사용하여 계산하여 처리하자.
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
        setImageCrop((imagecrop)=> ({...imagecrop, scale: offset.offset[0], rotation: resultAngle+imagecrop.rotation}))
      lastPosition.current = NewAngle
      }
      }
      ,
      onDragStart: (()=>{setIsDragged(true)})
      ,
      onDragEnd: ((offset)=>{
        setIsDragged(false)
        if(Number(offset.xy[0]) >= window.innerWidth*45/100 && 
        Number(offset.xy[0]) < window.innerWidth*55/100 && 
        Number(offset.xy[1]) > window.innerHeight*70/100 && 
        Number(offset.xy[1]) < window.innerHeight*80/100 && 
        isDragged) {
          let Newlist = list.filter( (lists:any) => lists.id != props.props.id)
          setList(Newlist)
        }
      })
    }
    ,
    {
      target: imageRef,
    }
  )
  return (
    <>
        <div className="useguesture-container" style={{position: "absolute", overflow: 'visible', visibility: 'hidden'}}>
          <img
            src={props.props.content}
            ref={imageRef}
            style={{
              position: "relative",
              left: imagecrop.x,
              top: imagecrop.y,
              transform: `scale(${imagecrop.scale}) rotate(${imagecrop.rotation}deg`,
              touchAction: "none",
              visibility: 'visible'
            }}
            draggable="false"
            onDoubleClick={()=>setIsEdit(true)}
            onTouchEnd={()=>{lastPosition.current = 0
              firstTime.current += 1}}
          >
          </img>
      </div>
      {isDragged?
          <Trashcan />
        :
          <></>
      }
    </>
  )
}

//-----------------------textcrop---------------------
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

export type FunctionArray = Array<React.Dispatch<React.SetStateAction<boolean>>| React.Dispatch<React.SetStateAction<settext>>| React.Dispatch<React.SetStateAction<maptext>>>
export let TextsettingFuncContext = React.createContext<FunctionArray | undefined>(undefined);

export type DataArray = Array<boolean | undefined | number | settext>
export let TextsettingDataContext = React.createContext<DataArray | undefined>(undefined);

export function TextCropper(props:any){
  let list:any = useContext(listDataContext);
  let setList:any = useContext(listSettingContext)
  let [isDragged, setIsDragged] = useState(false);
  let TextRef = useRef<HTMLDivElement>(null);
  let RectWidth:number|string = '50vw'
  let RectHeight:number|string = '50vh'
  let lastPosition: React.MutableRefObject<number> = useRef(0);
  let firstTime: React.MutableRefObject<number> = useRef(0);


  //setting-mode
  let [isEdit, setIsEdit] = useState<boolean>(true);
  let [textcrop, setTextCrop] = useState<settext>({id: props.props.id, x: 0, y: 0, scale:1, rotation: 0, fontSize: 100, fontColor: 'black', textalign: 'left', fontFamily: 'Cafe24Shiningstar'});

  useEffect(
  ()=>{
    if(TextRef.current) {
    RectWidth = window.innerWidth/2 - TextRef.current.getBoundingClientRect().width
    RectHeight = window.innerHeight/2 - TextRef.current.getBoundingClientRect().height
    setTextCrop({...textcrop, x: RectWidth, y:RectHeight})
  }
  }
  ,[TextRef])
  
  useGesture(
    {
      onDrag: (offset) => {

      setTextCrop({...textcrop, x: offset.offset[0], y:offset.offset[1]})

      if(Number(offset.xy[0]) >= window.innerWidth*45/100 && 
          Number(offset.xy[0]) < window.innerWidth*55/100 && 
          Number(offset.xy[1]) > window.innerHeight*70/100 && 
          Number(offset.xy[1]) < window.innerHeight*80/100 && 
          isDragged) {
        // isDraggble == true 이면, 휴지통 컴포넌트의 색상 바꾸기
        // 의문: 현재 디바이스에 따라 좌표가 조금씩 바뀌는데 그것은 어떻게 처리하면 좋을까? 부등호는 숫자에만 쓸 수 있어서 자동적으로 px로 고정되어 있음. window.innerWidth 값을 사용하여 계산하여 처리하자.
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
      }
      ,
      onDragStart: (()=>{setIsDragged(true)})
      ,
      onDragEnd: ((offset)=>{
        setIsDragged(false)
        if(Number(offset.xy[0]) >= window.innerWidth*45/100 && 
        Number(offset.xy[0]) < window.innerWidth*55/100 && 
        Number(offset.xy[1]) > window.innerHeight*70/100 && 
        Number(offset.xy[1]) < window.innerHeight*80/100 && 
        isDragged) {
          let Newlist = list.filter( (lists:any) => lists.id != props.props.id)
          console.log(Newlist)
          setList(Newlist)
        }
      })
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
        <div className="useguesture-container" style={{position: "absolute", overflow: 'visible', visibility: 'hidden'}}>
          <div
            ref={TextRef} 
            style={{
              position: "relative",
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
              textAlign: textcrop.textalign,
              visibility: 'visible'
            }}
            draggable="false"
            onDoubleClick={()=>setIsEdit(true)}
            onTouchEnd={()=>{lastPosition.current = 0}}
          >
            {props.props.content}
          </div>
        </div>
      }
      {isDragged?
      <Trashcan />
      :
      <>
      </>
      }
    </>
  )
}


//--------------------------------Map--------------------------------


interface maptext {
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


export let MapsettingFuncContext = React.createContext<FunctionArray | undefined>(undefined);
export let MapsettingDataContext = React.createContext<DataArray | undefined>(undefined);

export function MapCropper(props:any){
  let list:any = useContext(listDataContext);
  let setList: any = useContext(listSettingContext);

  //setting-mode
  let [isEdit, setIsEdit] = useState<boolean>(true);
  let [mapcrop, setMapCrop] = useState<settext>({id: props.props.id, x:0, y:0,scale:1, rotation: 0, fontSize: 100, fontColor: 'black', textalign: 'left', fontFamily: 'Cafe24Shiningstar'});
  let MapRef = useRef<HTMLDivElement>(null);
  //console.log(textcrop)

  let lastPosition: React.MutableRefObject<number> = useRef(0);
  let firstTime: React.MutableRefObject<number> = useRef(0);
  useGesture(
    {
      onDrag: (offset) => {
        setMapCrop({...mapcrop, x: offset.offset[0], y:offset.offset[1]})
      },
      onPinch: (offset) => {
        setMapCrop((mapcrop)=> ({...mapcrop, scale: offset.offset[0]}))
      },
    }
    ,
    {
      target: MapRef,
    }
  )

  const settingFunction: FunctionArray = [
    setIsEdit,
    setMapCrop
  ]

  const settingData: DataArray = [
    isEdit, mapcrop
  ]

  //-------------------------------지우기 Function --------------------------------
      let deleteText= ()=>{
        let Newlist = list.filter((list:any)=>{list.id != props.id})
        setList(Newlist)
      }
  
  return (
    <>
      {isEdit?
          <div className="useguesture-container"  style={{position: "absolute", overflow: 'visible', visibility: 'hidden'}}>
          <div
            ref={MapRef} 
            style={{
              position: "relative",
              left: mapcrop.x,
              top: mapcrop.y,
              transform: `scale(${mapcrop.scale}) rotate(${mapcrop.rotation}deg`,
              touchAction: "none",
              fontSize: `${mapcrop.fontSize}px`,
              color: mapcrop.fontColor,
              overflow: 'hidden',
              wordWrap: 'normal',
              maxWidth: 580,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: mapcrop.fontFamily,
              textAlign: mapcrop.textalign,
              border: "gray 1px solid",
              visibility: 'visible'
            }}
            draggable="false"
            onDoubleClick={()=>setIsEdit(false) }
            onTouchEnd={()=>{lastPosition.current = 0}}
          >
            <Map props={props.props} isEdit={true} latitude={37.55465450967681} longitude={126.97059787317687} width={500} height={300} tag="서울역"/>
        </div>
        </div>
      :
      <MapsettingDataContext.Provider value={settingData}>
          <MapsettingFuncContext.Provider value={settingFunction}>
          <div className="useguesture-container" style={{position: "absolute", overflow: 'visible', visibility: 'hidden'}}>
            <div style={{
              position: "relative",
              left: mapcrop.x,
              top: mapcrop.y,
              transform: `scale(${mapcrop.scale}) rotate(${mapcrop.rotation}deg`,
              touchAction: "none",
              fontSize: `${mapcrop.fontSize}px`,
              color: mapcrop.fontColor,
              overflow: 'hidden',
              wordWrap: 'normal',
              maxWidth: 580,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: mapcrop.fontFamily,
              textAlign: mapcrop.textalign,
              visibility: 'visible'
            }}
            onDoubleClick={()=>setIsEdit(true)}
            onTouchEnd={()=>{lastPosition.current = 0
              firstTime.current += 1}}
            >
                <Map isEdit={isEdit} props={props.props} latitude={37.55465450967681} longitude={126.97059787317687} width={500} height={300} tag="서울역"/>
            </div>
            </div>
          </MapsettingFuncContext.Provider>
      </MapsettingDataContext.Provider>
      }
    </>
  )
}

//----------------------------휴지통---------------------------------
export default function Trashcan() {

  return(
    <div style={{position:'fixed', left: window.innerWidth*45/100, top: window.innerHeight*70/100, zIndex:10, width: window.innerWidth*10/100, height: window.innerHeight*10/100, backgroundColor: 'gray'}} onMouseUpCapture={()=>console.log('실행')}>휴지통입니다.</div>
  )
}