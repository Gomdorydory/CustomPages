'use client'


import { faAlignLeft, faList12 } from "@fortawesome/free-solid-svg-icons";
import { faUnderline } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import {useContext, useEffect} from 'react';
import { listDataContext, listSettingContext } from "../plus";
import { settingDataContext, settingFuncContext } from "../library/useguesture"; 

export default function Text(props:any) {
  let list: any = useContext(listDataContext);
  let settingFunc: any = useContext(settingFuncContext);
  let settingData: any = useContext(settingDataContext);
  let listSettingFunc: any = useContext(listSettingContext);
  let setList = listSettingFunc

  let setIsEdit = settingFunc[1]

  const change = ()=>{
    setIsEdit(false)
  }

  const onChangeContent = (value:string)=> {
    let Newlist = [ ...list ]
    let targetIndex = Newlist.findIndex(v => v.id == props.props.id)
    //console.log(props.props.id);
    //console.log(targetIndex);
    console.log(Newlist[targetIndex])
    Newlist[targetIndex].content = value
    setList(Newlist)
    console.log(list)
    //console.log(props.content)
  }


  useEffect(()=>{
    change()
    setIsEdit(true)
  },[])

  return (
    <div className="create-text">
        <div className="text-setting1">
          <button onClick={()=>{change()}}> 여기를 클릭해봐</button>
          <div><FontAwesomeIcon icon={faUnderline}/></div>
          <div><FontAwesomeIcon icon={faAlignLeft}/></div>
          </div>
          <input className="slider" type="range"></input>
          <textarea defaultValue={props.props.content} onChange={(e)=>onChangeContent(e.currentTarget.value)}/>
        <div className="text-setting2"> 
            <div>폰트1</div>
            <div>폰트2</div>
            <div>폰트3</div>
        </div>
    </div>
    )
}
