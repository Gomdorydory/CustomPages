'use client'

import {v4 as uuidv4} from 'uuid';


import React, {useState, useRef, useContext} from "react"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Text from "./create/text";
import {ImageCropper, TextCropper, MapCropper} from "./library/useguesture";


import Map from "./create/map";


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
  let firstmyuuid = uuidv4();
  let [list, setList] = useState<PlusInfos>([
  ]);


  const OnText = () =>{
    let myuuid = uuidv4();
    let NewItem : PlusInfo = {id: myuuid, content: 'first', type: 'text'}
    setList((list)=>[...list, NewItem])
  }

  const OnPhoto = () =>{
  }

  const OnMap = () =>{
    let myuuid = uuidv4();
    let NewItem : PlusInfo = {id: myuuid, content: '서울역', type: 'map'}
    setList((list)=>[...list, NewItem])
    console.log(list)
  }

  const OnAlbum = () =>{
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
        <MapCropper props={list}/>
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
        <div className="item"  onClick={OnPhoto}><FontAwesomeIcon icon={faImage} size='sm'/></div>
        <div className="item"  onClick={OnMap}><FontAwesomeIcon icon={faMapLocationDot} size='sm'/></div>
        <div className="item"  onClick={OnAlbum}><FontAwesomeIcon icon={faTableCellsLarge} size='sm'/></div>
        </div>
      </listDataContext.Provider>
    </listSettingContext.Provider>
    )

}

