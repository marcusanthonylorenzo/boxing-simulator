import React, { useRef, useEffect} from 'react'
import './Display.css'
import SelectMenu from '../SelectMenu/SelectMenu'
import Textbox from '../../Interface/Textbox/Textbox'

const Display = ({ buttons, pbp, user, opp }) => {

  const displayDiv = useRef(null)

  useEffect(() => {
    console.log(displayDiv.scrollHeight)

    displayDiv.current.scrollTop = displayDiv.current.scrollHeight ;
  })




  const mapPbp = () => { 
    return pbp.map((scrap, i) => {

      let getAttacker = scrap.attacker
      return (
        <>
        <Textbox key={i} scrap={scrap} getAttacker={getAttacker} user={user} opp={opp}/>
        </>
      )
    })
  }

  return (

    <div className="Display">

      <div ref={displayDiv} className="display-container">
        <h4>Fight Night</h4>
          {mapPbp()}
      </div>

      <div className="display-options">
        <SelectMenu buttons={buttons} />
      </div>


    </div>
    
  )
}

export default Display