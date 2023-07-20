'use client'

import React, {useEffect, useRef, useState} from "react";
import { useGesture } from "@use-gesture/react"


declare global {
  interface Window {
    kakao: any;
  }
}

export interface MapProps {
  latitude: number;
  longitude: number;
  width: number;
  height: number;
  tag: string
}
var addressresult : string
export default function Map({latitude, longitude, width, height, tag}:MapProps) {
    useEffect(()=>{
  const mapScript = document.createElement("script");

  mapScript.async = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services&autoload=false`;
  

  document.head.appendChild(mapScript);

  const onLoadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");

      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨,
      };

      new window.kakao.maps.Map(mapContainer, mapOption);

      let maps = new window.kakao.maps.Map(mapContainer, mapOption);

      let markerPosition = new window.kakao.maps.LatLng(37.55465450967681, 126.97059787317687)

      let marker = new window.kakao.maps.Marker({position: markerPosition})

      marker.setMap(maps);

      var customOverlay= new window.kakao.maps.CustomOverlay({
        map: maps,
        content: `<div style="padding: 10px; background-color: white; border-radius: 10%; box-shadow: 0 10px 35px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.1); font-size: 30px;">${tag}</div>`,
        position: new window.kakao.maps.LatLng(latitude, longitude),
        xAnchor: 0.5,
        yAnchor: -0.5
      })

      //주소 얻기
      var geocoder = new window.kakao.maps.services.Geocoder();
      var coord  = new window.kakao.maps.LatLng(latitude, longitude);

      var callback = function(result:any, status:any) {
        if (status === window.kakao.maps.services.Status.OK) {
            console.log('그런 너를 마주칠까 ' + result[0].address.address_name + '을 못가');
            addressresult = result[0].address.address_name
        }

      
    };

      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback)
    });
}; 
  mapScript.addEventListener("load", onLoadKakaoMap);
}, [latitude, longitude])





//}
  return (<>
  <div style={{fontSize: '50px', }} draggable="false">찾아오시는 길</div>
  <div style={{fontSize: '20px', }} draggable="false">{addressresult}</div>
  <div style={{width:width, height:height}} id="map">
  </div>
  </>)
}
