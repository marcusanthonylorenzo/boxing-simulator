import React, { useState, useRef, useEffect } from 'react'
import './Display.css'
// import SelectMenu from '../SelectMenu/SelectMenu'
import Textbox from '../../Interface/Textbox/Textbox'
// import touch from '../../../assets/images/touchGloves.jpg'

const Display = ({ ko, pbp, user, opp, fightStart, roundCount }) => {

  const [fade, setFade] = useState({backgroundColor:`gray`});
  const [hide, setHide] = useState(`show`);
  const [hideRules, setHideRules] = useState(`show`)
  const [hideRefTalk, setHideRefTalk] = useState(`hideRefTalk`)

  //dependency is if fightStart is truthy
  useEffect(() => fightStart ? setHideRules(`hide`) : setHideRules(`show`),[fightStart]);

  setTimeout(() => {
    setFade({backgroundColor: `white`});
    setHide(`hide`);
    setHideRefTalk(`black`);
  },  6900);

  const displayDiv = useRef(null) //auto scroll to bottom
  useEffect(() => {
    setTimeout(() => {
    displayDiv.current.scrollTop = displayDiv.current.scrollHeight;
    }, 1000);
  });
  

  const mapPbp = () => { 
    return pbp.map((scrap, i) => {
      let getAttacker = {
        ...scrap.attacker,
        cornerColor: scrap.favoriteColor,
      }
      ; //remember to change all keys! no indexes when shipping
      return ( 
         <Textbox key={i} ko={ko} input={scrap} getAttacker={getAttacker} user={user} opp={opp} pbp={pbp}/>   
      )
    })
  }

  return (
    <>
    <div ref={displayDiv} className={"Display"}>
 
      <div className="display-container">
        <div id="walk-ins" className={hide}>
          <h4>The fighters walk into the ring...</h4>
        </div>
          <div className={`ref-talk ${hideRules} ${hideRefTalk}`} style={fade}>
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