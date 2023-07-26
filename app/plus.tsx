'use client'

import {v4 as uuidv4} from 'uuid';


import React, {useState, useRef, useContext} from "react"


import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Trashcan, {ImageCropper, TextCropper, MapCropper} from "./library/useguesture";


export interface PlusInfo {
  id: string | undefined;
  content : string | undefined;
  type: types
}

interface PlusInfos extends Array<PlusInfo>{}
export const listDataContext = React.createContext<PlusInfos|undefined>(undefined);
export type listSettingArray = React.Dispatch<React.SetStateAction<PlusInfos>>
export const listSettingContext = React.createContext<listSettingArray | undefined>(undefined);

export type types = 'text' | 'image' | 'map' | 'album' | 'link'


export default function Plus() {
  let [list, setList] = useState<PlusInfos>([
  ]);


  const OnText = () =>{
    let myuuid = uuidv4();
    let NewItem : PlusInfo = {id: myuuid, content: 'NewJeans', type: 'text'}
    setList((list)=>[...list, NewItem])
  }

  //---------------------Photo----------------------------

  const fileInput:any = useRef(null)
  const onPhoto = async (e:any) => {
    let myuuid = uuidv4();

    //내가 받을 파일은 하나임, index 0 값의 이미지를 가짐
    const file = e.target.files[0]

    if(!file) return
    
    // 이미지 화면에 띄우기
    const reader = new FileReader()

    //파일을 불러오는 메서드, 종료되는 시점에 readyState는 Done(2)이 되고, onLoad시작
    reader.readAsDataURL(file)
    reader.onload = (e:any) => {
      if(reader.readyState ===2) {
        //파일 onLoad가 성공하면 2, 진행중은 1, 실패는 0 반환
        let NewItem : PlusInfo = {id: myuuid, content: e.target.result, type: 'image'}
        setList((list)=>[...list, NewItem])
            console.log(list);
      }
    }
  }

  const OnMap = () =>{
    console.log(list)
    list.filter((list)=>{console.log(list.type)})
    console.log(list.filter((list)=>{list.type == "map"}))
    if(list.filter((list)=>{list.type=='map'}).length){ //true = 뭔가있음, false = 빈배열
      console.log('이미 지도가 존재합니다.')
    } else {
      let myuuid = uuidv4();
      let NewItem : PlusInfo = {id: myuuid, content: '서울역', type: 'map'}
      setList((list)=>[...list, NewItem])
      console.log(list)
    }
  }


  let result = list.map(
    (list)=>{
      if(list.type=='text'){
      return(
    <div className="main-item" key={list.id}>
      <TextCropper props={list}/>
    </div>)
    } else if(list.type =='map') {
      return(
        <div key={list.id}>
        <MapCropper props={list}/>
        </div>
      )
    } else if(list.type =='image') {
      return (
        <div key={list.id}>
          <ImageCropper props={list}/>
        </div>
      )
    }
    }
    )

  return (
    <listSettingContext.Provider value={setList}>
      <listDataContext.Provider value={list}>
      {result}
        <div className="main-plus" style={{zIndex: -2}}>
        <div className="item"  onClick={OnText}><FontAwesomeIcon icon={faPenToSquare} size='sm'/></div>
        <label className='item' htmlFor='input-file'><FontAwesomeIcon icon={faImage} size='sm'/></label>
        <div className="item"  onClick={OnMap}><FontAwesomeIcon icon={faMapLocationDot} size='sm'/></div>
        <input 
            type="file" name="image_URL" id="input-file" accept='image/*'
            style={{display :"none"}} ref={fileInput} onChange={onPhoto}
        />
        </div>
      </listDataContext.Provider>
    </listSettingContext.Provider>
    )

}

