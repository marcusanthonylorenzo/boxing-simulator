import React, { useState, useRef, useEffect } from 'react'
import './Display.css'
// import SelectMenu from '../SelectMenu/SelectMenu'
import Textbox from '../../Interface/Textbox/Textbox'

const Display = ({ buttons, pbp, user, opp, fightStart }) => {

  const [fade, setFade] = useState(`gray`);
  const [hide, setHide] = useState(`show`);
  const [hideRules, setHideRules] = useState(`show`)

  //dependency is if fightStart is truthy
  useEffect(() => fightStart ? setHideRules(`hide`) : setHideRules(`show`),[fightStart]);

  setTimeout(() => {
    setFade(`white`);
    setHide(`hide`)
  },  5500);

  const displayDiv = useRef(null) //auto scroll to bottom
  useEffect(() => {
    setTimeout(() => {
    displayDiv.current.scrollTop = displayDiv.current.scrollHeight;
    },5000);
  });

  const mapPbp = () => { 
    return pbp.map((scrap, i) => {
      let getAttacker = scrap.attacker; //remember to change all keys! no indexes when shipping
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
        <div id="walk-ins" className={hide}><h4>The fighters walk into the ring...</h4>
        </div>
          <div className={`ref-talk ${hideRules}`} style={{backgroundColor: fade}}>
            <h3>Gentlemen, you know the rules.</h3>
            <h3>I want a good, clean fight - are we clear?</h3>
            <h3>You break when I say you break, keep your punches above the belt.</h3>
            <h3>Protect yourself at all times!</h3>
            <h3>We ready? Touch em.</h3>
          </div>
          {mapPbp()}         
      </div>
    </div> 
  </>
  )
}

export default Display