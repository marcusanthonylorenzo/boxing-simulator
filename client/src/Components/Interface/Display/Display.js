import React, { useState, useRef, useEffect } from 'react'
import './Display.css'
// import SelectMenu from '../SelectMenu/SelectMenu'
import Textbox from '../../Interface/Textbox/Textbox'

const Display = ({ buttons, pbp, user, opp }) => {

  const [fade, setFade] = useState(`gray`)

  setTimeout(() => {
    setFade(`white`);
  },  10000);

  const displayDiv = useRef(null)
  useEffect(() => {
    setTimeout(() => {
    displayDiv.current.scrollTop = displayDiv.current.scrollHeight; //auto scroll to bottom
    }, 10000);
  });

  const mapPbp = () => { 
    return pbp.map((scrap, i) => {
      let getAttacker = scrap.attacker;
      //SHOULDNT use key for React child, but for MVP I will.
      return (
        <>
        <Textbox key={i} input={scrap} getAttacker={getAttacker} user={user} opp={opp}/>
        </>
      )
    })
  }

  return (
    <>
    <div ref={displayDiv} className={"Display"}>
 
      <div className="display-container">
          <div className="ref-talk" style={{backgroundColor: fade}}>
            <h4 id="walk-ins">The fighters walk into the ring...</h4>

            <h3>Gentlemen, you know the rules.</h3>
            <h3>I want a good, clean fight - are we clear?</h3>
            <h3>You break when I say you break, keep your punches above the belt.</h3>
            <h3>Protect yourself at all times!</h3>
            <h3>We ready? Touch em.</h3>
          </div>

          {mapPbp()}         
      </div>

      {/* <div className="display-options">
        <SelectMenu buttons={buttons} />
      </div> */}

    </div> 
  </>
  )
}

export default Display