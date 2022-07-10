import React, {useState} from 'react'
import './BoxerCard.css'
import Commentary from '../../Helpers/Commentary'
import goldBelt from '../../../assets/images/goldBelt.png'

const BoxerCard = ({ boxer, path, corner }) => {

  const commentary = Commentary();  //unpack running function component to get objects to unpack
  const life = Math.round(boxer.lifeLeft()*100);
  const energy = Math.round((boxer.con*100)+52);
  const cornerColor = corner();

  console.log(cornerColor)


  const changeColor = (life) => {
    if (life <= 100 && life >= 75) {
      return `#00b424`
    } else if (life <= 75 && life > 50) {
      console.log("pale green")
      return `#bce920`;
    } else if (life <= 50 && life > 35) {
      console.log("yellow")
      return `#fffc1e`;
    } else if (life <= 35 && life > 19) {
      console.log("orange")
      return `#f58000`;
    } else if (life <= 19) {
      return `#e80000`;
    }
  }
  
  


  return (

    <div className="BoxerCard" style={{backgroundColor: cornerColor.cornerColor}}>

      {/* <h4 className={`boxer-corner`} style={{color: cornerColor.cornerColor}}>
      <span>{cornerColor.cornerColor}</span> Corner</h4> */}

      <div className="boxer-info border padded">

        <h4 className={'name'}><em>{boxer.firstName}</em></h4>
        <h4 className={'name'} style={{ fontWeight: `300px`}}><em>"{boxer.nickname}"</em></h4>
        <h4 className={'name'}><em>{boxer.lastName}</em></h4>


        <div className="boxer-condition">
          <div className="boxer-condition-body" style={{
            backgroundColor: changeColor(life), //Change phyiscal condition by color, red is near knockout
            backgroundImage: `url('${path}')`,
            opacity: `${energy}%`}}>

            <img src={path} alt={'boxer body'}/>
            
            <h5>{Math.round(boxer.hp)} {life} {Math.round((boxer.con*100))}</h5>

          </div>
        </div>


      </div>


      <div className={`fight-stats border padded`}>
        <h3>Fight stats brought to you by Modelo.</h3>
      </div>


      <div className={'boxer-info-profile border padded'}>

        <h5 className={`info-titles`}>Height / Weight / Reach:</h5>
        <h5> Height {boxer.weightClass} Reach </h5>

        <h5 className={`info-titles`}>Fighting out of:</h5>
          <h5 className={'info-details'}><em>{boxer.hometown}</em></h5>
          
        <h5 className={`info-titles`}>Record:</h5>
          <h5 className={'info-details'}>{boxer.win} - {boxer.loss}</h5>
          
        <h5 className={`info-titles`}>Rank:</h5>
          {/* <h5 className={'info-details'}>{boxer.rank} ({ commentary.weightClassName(boxer) })</h5> */}

        { boxer.champion ? <span className={`champ`}><h5>CHAMPION</h5><img src={goldBelt} id={`champ`} alt="CHAMPION"/> </span> : <h5 className={'info-details'}>{boxer.rank} ({ commentary.weightClassName(boxer) })</h5> }

      </div>

    </div>
  )
}

export default BoxerCard