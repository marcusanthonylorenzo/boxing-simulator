import React, {useState, useEffect} from 'react'
import './BoxerCard.css'
import Commentary from '../../Helpers/Commentary'

const BoxerCard = ({ boxer, path }) => {

  const commentary = Commentary();  //unpack running function component to get objects to unpack
  const life = Math.round(boxer.lifeLeft()*100);
  const energy = Math.round((boxer.con*100)+55);

  // const [damageColor] = useState(life);
  // const [opac, setOpac] = useState(life);

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

    <div className="BoxerCard">


      <div className="boxer-info">
        <h4 className={'name'}><em>{boxer.firstName} "{boxer.nickname}"</em></h4>
        <h4 className={'name'}><em>{boxer.lastName}</em></h4>
      </div>


      <div className="boxer-condition">
        <div className="boxer-condition-body" style={{
          backgroundColor: changeColor(life), //Change phyiscal condition by color, red is near knockout
          backgroundImage: `url('${path}')`,
          opacity: `${energy}%`
      }}>

        <img src={path} alt={'boxer body'}/>
        
        <h5>{Math.round(boxer.hp)} {life} {Math.round((boxer.con*100))}</h5>

        </div>
      </div>


      <div className={'boxer-info-profile'}>

        <h5 className={`info-titles`}>Fighting out of:</h5>
          <h5 className={'info-details'}><em>{boxer.hometown}</em></h5>
          
        <h5 className={`info-titles`}>Record:</h5>
          <h5 className={'info-details'}>{boxer.win} {boxer.loss}</h5>
          
        <h5 className={`info-titles`}>Rank:</h5>
          <h5 className={'info-details'}>{boxer.rank} ({ commentary.weightClassName(boxer) })</h5>

      </div>

    </div>

  )

}

export default BoxerCard