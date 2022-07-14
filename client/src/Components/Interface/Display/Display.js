import React, { useState, useRef, useEffect } from 'react'
import './Display.css'

const Display = ({ ko, pbp, user, opp, fightStart, roundOver }) => {

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

    const continueText = () => { //set opening text to black color
      let fontCol = `white`;
      let fontSiz = `1rem`;
      if (pbp.length === 1) {
        fontCol = `black`;
        fontSiz = `2rem`;
      } else { 
        fontCol = `white`;
      }
      return (
      <div className={`textbox`} style={{
        backgroundColor: getAttacker.favoriteColor,
        color: fontCol,
        fontSize: fontSiz
      }}>{scrap.text}</div>
      )
    }

    const koedText =
      <div className={`options`} style={{color: `black`}}>
        <h4>The fighters both in the pocket trading heavy blows right now!</h4>
        <h4>{scrap.text}</h4>
      </div>
    
    // const roundOverText =
    //   <div className={`options`}>{scrap.text}</div>

      return (
        <>
        {
        !ko ? continueText() : koedText
        }
        </>
      )
    })
  };


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