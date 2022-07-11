import React, { useState, useRef, useEffect} from 'react'
import './Display.css'
import SelectMenu from '../SelectMenu/SelectMenu'
import Textbox from '../../Interface/Textbox/Textbox'

const Display = ({ buttons, pbp, user, opp }) => {

  // const [userIntro, setUserIntro] = useState([]);
  // const [oppIntro, setOppIntro] = useState([]);

  const displayDiv = useRef(null)
  useEffect(() => {
    displayDiv.current.scrollTop = displayDiv.current.scrollHeight; //auto scroll to bottom
  })


  const mapPbp = () => { 
    return pbp.map((scrap, i) => {
      let getAttacker = scrap.attacker
      //SHOULDNT use key for React child, but for MVP I will.
      return (
        <>
        <Textbox key={i} input={scrap} getAttacker={getAttacker} user={user} opp={opp}/>
        </>
      )
    })
  }

  // const setIntros = (person, colorOfTrunks) => {
  //   const arrayIntro = [
  //     <h4>IN the <span style={{color: person.cornerColor, opacity: `90%`}}>{person.cornerColorLabel} corner</span>.</h4>,
  //     <h4>Wearing the {colorOfTrunks} trunks.</h4>,
  //     <h4>{ !person.champion ? <h4>The {person.weightClass} CHAMPION of the WORLD</h4> : <h4>The number {person.rank} ranked fighter in the {person.weightClass} division...</h4> }</h4>,
  //     <h4>Fighting out of {person.hometown.toUpperCase()}...</h4>,
  //     <h3>{person.firstName.toUpperCase()}</h3>,
  //     <h3>{person.nickname}</h3>, 
  //     <h3>{person.lastName.toUpperCase()}</h3>
  //   ];
  //   return epicIntros(arrayIntro)
  // }

  // const epicIntros =(whatToIntro) => {
  //   //remember not to use index as keys next time!
  //   return whatToIntro.map((item, i) => {
  //     return (
  //       <div className="intro-text-box" key={i}>
  //         {item}
  //       </div>
  //     )
  //   })
  // } 

  // const getOppIntro = setIntros(opp, "black and gold");
  // const getUserIntro = setIntros(user, "blue");

  return (
    <>
    <div ref={displayDiv} className="Display">
 
      <div className="display-container">
        <h4>It's Fight Night</h4>

        <div className="intros"> {/*Fighter intros!*/}
          {/* {getUserIntro} */}
        </div>

          {mapPbp()}         
      </div>

      <div className="display-options">
        <SelectMenu buttons={buttons} />
      </div>

    </div> 
  </>
  )
}

export default Display