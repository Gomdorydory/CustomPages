'use client'

import React, {useState, useRef} from 'react'
import Image from 'next/image'

export default function Photo() {
  //초기값은 프로필 사진 없을 때 넣을 기본 이미지
  const [image, setImage] = useState('/blank.png');

  const fileInput:any = useRef(null)

  const handleImage = async (e:any) => {
    // 내가 받을 파일은 하나기 때문에 index 0값의 이미지를 가짐
    const file = e.target.files[0]

    if(!file) return
    
    // 이미지 화면에 띄우기
    const reader = new FileReader()
    
    //파일을 불러오는 메서드, 종료되는 시점에 readyState는 Done(2)이 되고 onLoad 시작
    reader.readAsDataURL(file)
    reader.onload = (e:any) => {
      if(reader.readyState ===2) {
        //파일 onLoad가 성공하면 2, 진행 중은 1, 실패는 0 반환
        setImage(e.target.result)
      }
    }

  }
    // 이미지 클릭했을 때 이미지 업로드, 숨긴 input의 reference를 fileInput으로 설정해서 가능
		// 이미지 업로드 버튼, htmlFor값을 숨긴 input의 id값으로 설정
		// 실제 이미지 받을 file 타입의 input
  return (
    <div className="Create-photo">
    <a href="#" onClick={() => fileInput.current.click() } >
    <Image src={image} width={150} height={150} alt='이미지'/>
    </a>
		<label htmlFor="input-file" >이미지 선택</label>
		<input type="file" name="image_URL" id="input-file" accept='image/*'
		style={{ display : "none" }} ref={fileInput} onChange={handleImage} />
    </div>
    )

}

