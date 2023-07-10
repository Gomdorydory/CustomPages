'use client'


import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { faAlignCenter} from "@fortawesome/free-solid-svg-icons";
import { faAlignRight } from "@fortawesome/free-solid-svg-icons";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { faUnderline } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Text() {

  return (
    <div className="create-text">
        <div className="text-setting1">
          <div><FontAwesomeIcon icon={faUnderline}/></div>
          <div><FontAwesomeIcon icon={faAlignLeft}/></div>
          </div>
          <input className="slider" type="range"></input>
          <textarea/>
        <div className="text-setting2">
            <div>폰트1</div>
            <div>폰트2</div>
            <div>폰트3</div>
        </div>
    </div>
    )
}
