'use client'

import { ReactNode, useState, useRef } from "react"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Text from "./create/text";
import {ImageCropper, TextCropper} from "./library/useguesture";

interface PlusInfo {
  id: string | undefined;
  options : string | undefined;
}

interface PlusInfos extends Array<PlusInfo>{}

export default function Plus() {
  let [list, setList] = useState<PlusInfos>([
    {
      id: 'string',
      options : 'string'
    },
    {
      id: 'string',
      options : 'string'
    },
    {
      id: 'string',
      options : 'string'
    }
  ]);


  const OnCreate = () =>{
    let NewList = [...list]
    let NewItem = {id: 'first', options: 'first'}
    NewList = [...NewList, NewItem]
    setList(NewList); 
  }

  const OnText = () =>{
    let selectedMenu = 
    <div>
        <button onClick={ToMenu}>X</button>
        <button>Done</button>
        <Text />
    </div>
    setSelected(selectedMenu)
  }

  const ToMenu = () => {
    let selectedMenu =  <div className="main-plus">
    <div className="item"  onClick={OnText}><FontAwesomeIcon icon={faPenToSquare} size="2xl"/></div>
    <div className="item"  onClick={OnPhoto}><FontAwesomeIcon icon={faImage}  size="2xl"/></div>
    <div className="item"  onClick={OnMap}><FontAwesomeIcon icon={faMapLocationDot}  size="2xl"/></div>
    <div className="item"  onClick={OnAlbum}><FontAwesomeIcon icon={faTableCellsLarge}  size="2xl"/></div>
  </div>
    setSelected(selectedMenu)
  }

  let _id = useRef<number>(0);
  const OnPhoto = () =>{
    _id.current += 1
    let NewItem = {id: _id.current.toString(), options: 'first'}
    console.log([...list, NewItem])
    setList((list)=>[NewItem, ...list])
  }

  const OnMap = () =>{
    let NewList = [...list]
    let NewItem = {id: 'first', options: 'first'}
    NewList = [...NewList, NewItem]
    setList(NewList); 
  }

  const OnAlbum = () =>{
    let NewList = [...list]
    let NewItem = {id: 'first', options: 'first'}
    NewList = [...NewList, NewItem]
    setList(NewList); 
  }




  let [selected, setSelected] = useState<ReactNode>(
    <div className="main-plus">
    <div className="item"  onClick={OnText}><FontAwesomeIcon icon={faPenToSquare} size="2xl"/></div>
    <div className="item"  onClick={()=>{OnPhoto()}}><FontAwesomeIcon icon={faImage}  size="2xl"/></div>
    <div className="item"  onClick={OnMap}><FontAwesomeIcon icon={faMapLocationDot}  size="2xl"/></div>
    <div className="item"  onClick={OnAlbum}><FontAwesomeIcon icon={faTableCellsLarge}  size="2xl"/></div>
  </div>
  );



  let result = list.map((content,i)=><div className="main-item" key={i}> <TextCropper src={content.options}/>{content.options}</div>)
  return (
    <div>
    {result}
    {selected}

    </div>
    )

}

