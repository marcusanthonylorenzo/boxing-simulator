import React, { useState, useRef, useEffect } from 'react'
import './Display.css'
import SelectMenu from '../SelectMenu/SelectMenu'

const Display = ({ ko, pbp, user, opp, fightStart, roundOver, roundCount, buttons }) => {

  const [fade, setFade] = useState({backgroundColor:`gray`});
  const [hide, setHide] = useState(`show`);
  const [hideRules, setHideRules] = useState(`show`);
  const [hideRefTalk, setHideRefTalk] = useState(`hideRefTalk`);
  const [getPepTalk, setPepTalk] = useState();

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

  const fightIntroText = () => {

    return (
      <>
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
      </>
    )
  }


  const mapPbp = () => {  //map Play By Play
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

    const koedText = //KO result text
      <div className={`options`} style={{color: `black`}}>
        <h4>The fighters both in the pocket trading heavy blows right now!</h4>
        <h4>{scrap.text}</h4>
      </div>

      return (
        <>
        {!ko ? continueText() : koedText} {/* continue or show KO OR judgesDecision() */}
        {roundOver && !ko ? modal() : null}
        </>
      )
    })
  };


  
      // console.log(Object.entries(user[`pepTalk`]))

    const modal = () => { //popup between rounds
      const pepTalkEntries = Object.entries(user[`pepTalk`])      
      return (
        <>
          <div className={`options`}>
            <div className={`options-select`}>
              <h4>Round {roundCount} over.</h4>
                <div className={`select-menu`}>

                    {pepTalkEntries.map((entry, i)  => {

                      const eachEntry = entry[i];
                      const pepTalkLabel = entry[0];
                      const pepTalkMethod = entry[1];
                      
                      return(
                        <>
                          <button key={pepTalkLabel} className={`pep-talk-buttons`}
                            onClick={ e => {
                              e.preventDefault()
                              pepTalkMethod()
                            }}>
                              {pepTalkLabel}                               
                            </button>
                        </>   
                      )

                    })}

                </div>
            </div>
          </div>
        </>
      )
    }

  return (
    <>
    <div ref={displayDiv} className={"Display"}>
 
      <div className="display-container">
          { roundCount === 0 ? fightIntroText() : null} {/* show ref intro pre-round 1 */}
          {mapPbp()}         
      </div>
    </div> 
  </> 
  )
}

export default Display