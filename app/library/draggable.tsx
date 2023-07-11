'use client'

import React from "react";
import Draggable, {DraggableData,DraggableEvent } from "react-draggable";
import { useState } from "react";

type Position = {
  x: number;
  y: number;
};

interface PropsType {
  src: string|undefined
}

export default function Drag(props: PropsType) {
  const [currentPosition, setCurrentPosition] = useState<Position>({
    x: 0,
    y: 0
  });

  const onDrag = (e: DraggableEvent, data: DraggableData) => {
    setCurrentPosition({ x: data.x, y: data.y });

  };

  return (
    <Draggable
      position={{
        x: currentPosition.x,
        y: currentPosition.y
      }}
      onDrag={onDrag}
    >
      <div className="Piece" style={{width:'50px', height:'50px', background:'red'}}>
        <img draggable='false' className='Piece' src={props.src} alt='사진' style={{}}></img>
      </div>
    </Draggable>
  );
};