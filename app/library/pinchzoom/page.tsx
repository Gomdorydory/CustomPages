'use client'

import React, { Component } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Example(){
  return (
    <TransformWrapper>
      <TransformComponent>
        <img src="https://yourheartbadge.co.kr/web/product/tiny/attachment005.jpg" alt="test" />
      </TransformComponent>
    </TransformWrapper>
  );
};