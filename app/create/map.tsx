'use client'



import React, {useEffect} from "react";

declare global {
  interface Window {
    kakao: any;
  }
}




export default function MapTest() {

  useEffect(()=>{
    console.log(process.env.KAKAOMAP_KEY);
  },[])
  //process.env가 undefined가 나옴.. 근데 page.tsx에 넣었을 때는 콘솔에 찍힘.
  console.log(process.env.KAKAOMAP_KEY);

  if (typeof window !== 'undefined') {
    //can use document here
  const mapScript = document.createElement("script");

  mapScript.async = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=bad50d0161e20154beaf92e76642ce17&autoload=false`;

  document.head.appendChild(mapScript);

  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      new window.kakao.maps.Map(mapContainer, mapOption);
    });
  };
  mapScript.addEventListener("load", onLoadKakaoMap);
}
  return <div style={{width:500, height:500}}id="map"></div>;
}

