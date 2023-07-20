'use client'

import { useRef, useState, useContext, useEffect} from 'react';

import { faAlignLeft, faList12 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { listDataContext, listSettingContext } from "../plus";
import { TextsettingDataContext, TextsettingFuncContext } from "../library/useguesture"; 

export default function Text(props:any) {
  //plus.tsx의 list 값 Context
  let list: any = useContext(listDataContext);
  let listSettingFunc: any = useContext(listSettingContext);
  let setList = listSettingFunc

  //isEdit, isDragged의 Boolean값 변경 Context
  let settingFunc: any = useContext(TextsettingFuncContext);
  let settingData: any = useContext(TextsettingDataContext);
  let setIsEdit = settingFunc[1]
  let setTextCrop = settingFunc[2]
  let textcrop = settingData[1] //현재 div의 textcrop값이 들어있음.

  //fontSize
  let fontSlider = useRef<HTMLInputElement>(null);

  const onChangeFontSize = (value:string)=>{
    let NewTextCrop = {...textcrop}
    NewTextCrop.fontSize = value
    setTextCrop(NewTextCrop)
  }

  const onExit = ()=>{
    setIsEdit(false)
  }


  const onChangeContent = (value:string)=> {
    let Newlist = [ ...list ]
    let targetIndex = Newlist.findIndex(v => v.id == props.props.id)
    //console.log(props.props.id);
    //console.log(targetIndex);
    //console.log(Newlist[targetIndex])
    Newlist[targetIndex].content = value
    setList(Newlist)
    console.log(textcrop.fontSize)
    //console.log(list)
    //console.log(props.content)
  }


  useEffect(()=>{
    onExit
    setIsEdit(true)
  },[])

  //color값
  let color:Array<string>= (['#FFFFFF', '#CCCCCC', '#B3B3B3', '#999999', '#808080', '#666666', '#4D4D4D', '#333333','#000000', '#F44E3B','#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF'] );
  const ChangeColor = (i:any)=> {
    let NewTextCrop = {...textcrop}
    NewTextCrop.fontColor = i
    setTextCrop(NewTextCrop)
  }
  let colorResult = color.map(
    (i)=>{
      return(
      <div key={i} style={{backgroundColor:i, borderRadius: '50%', width: '30px', height: '20px'}} 
      onClick={()=>ChangeColor(i)}></div>
      )
    }
  )

  //fontfamily 바꾸기
  let fontfamily:Array<string>= (['Nanum Myeongjo', 'Cafe24Shiningstar', 'GowunBatang-Regular', 'GowunDodum-Regular', 'Dovemayo_gothic'])  
  const ChangeFontFamily = (i:any)=>{
    let NewTextCrop = {...textcrop}
    NewTextCrop.fontFamily = i
    setTextCrop(NewTextCrop)
  }

  let fontFamilyResult = fontfamily.map((i)=>{
      return(
      <div key={i} style={{backgroundColor:i, width: '50px', height: '20px', background: 'gray', fontFamily:i, fontSize: '20px', textAlign: 'center'}} 
      onClick={()=>ChangeFontFamily(i)}>글꼴</div>
      )
    }
  )

    //fontalign 바꾸기
    let textalign = ['center','left','right']
    let index = useRef(1)
    const onChangeTextAlign = ()=>{
        index.current = index.current + 1
      if(index.current >= textalign.length){
        index.current = 0
        }
      let NewTextCrop = {...textcrop}
      NewTextCrop.textalign = textalign[index.current]
      setTextCrop(NewTextCrop)
    }

  return (
    <div className="create-text">
        <div className="text-setting1">
          <div onClick={()=>{onExit()}}> X </div>
          <div onClick={()=>{}}> 가 </div>
          <div onClick={()=>{onChangeTextAlign()}} ><FontAwesomeIcon icon={faAlignLeft}/></div>
          </div>
          <input 
            className="slider" 
            ref={fontSlider} 
            type="range" 
            max={200} min={50} 
            onChange={(e)=>{onChangeFontSize(e.currentTarget.value)}} 
            value={textcrop.fontSize}>
          </input>
          <textarea 
            defaultValue={props.props.content} 
            onChange={(e)=>onChangeContent(e.currentTarget.value)}  
            style={{
              fontSize: `${textcrop.fontSize}px`, 
              color: textcrop.fontColor,
              fontFamily: textcrop.fontFamily,
              textAlign: textcrop.textalign
              }}
            />
        <div className="text-setting2">
          <div>{fontFamilyResult}</div>
          <div>{colorResult}</div>
        </div>
    </div>
    )
}
