import React, { useState, useEffect} from 'react'
// import { useSpring, animated as ani} from 'react-spring'
import './BoxerCard.css'
import Commentary from '../../Helpers/Commentary'
import goldBelt from '../../../assets/images/goldBelt.png'

const BoxerCard = ({
  boxer, path, corner,
  roundOver, roundCount, setFinalTotals,
  exchangeCount, punchCount, fightNumber, prevFightNumber }) => {

  console.log(boxer.hp)

  const commentary = Commentary();  //unpack running function component to get objects to unpack
  const life = Math.round(boxer.lifeLeft()*100);
  const energy = Math.round((boxer.con*100)+35);
  const cornerColor = corner(); //boxers ready with extra fight properties compared to normal user/enemy
  const dmgScale = cornerColor.dmgScale(); //scales animation properties based on health
  // const getColor = cornerColor.cornerColor; //color of corner
  // const favColor = cornerColor.favoriteColor; //get boxer shorts color
  const boxerName = boxer.firstName;

  //toggles, collection data
  const [show, setShow] = useState(`hide`);
  const [fade, setFade] = useState(``);
  const [dmgTracker, setDmgTracker] = useState([]); //tracks each punch for graphs
  const [engagementCount, setEngagementCount] = useState(0);
  const [boxerPunchData, setBoxerPunchData] = useState([]);
  // const [roundByRoundData, setRoundByRoundData] = useState([]);


  const showHide = (show, set) => {
    if (show) {
      set(`hide`);
    } else if (!show) {
      set(`show`);
    }
  }

  const filterPunchData = boxerPunchData.filter(data => {
    if (roundCount === data.round) {
      return data;
    }
  });

  //filter fight data by round
  const totalPunchesLanded = filterPunchData.reduce((acc, cur) => acc += cur.punchesLanded, 0);
  const totalPunchesThrown = filterPunchData.reduce((acc, cur) => acc += cur.punchesThrown, 0);
  const engagementRate = filterPunchData.reduce((acc, cur) => acc = cur.engagementRate, 0);
  const ringControl = filterPunchData.reduce((acc, cur) => acc = cur.ringControl, 0);
  
  //get total fight data, all rounds, especially for judges
  const getTotalPunchesLanded = boxerPunchData.reduce((acc, cur) => acc += cur.punchesLanded, 0);
  const getTotalPunchesThrown = boxerPunchData.reduce((acc, cur) => acc += cur.punchesThrown, 0);
  const totalAccuracy = getTotalPunchesLanded / getTotalPunchesThrown;
  const getTotalRingControl= boxerPunchData.reduce((acc, cur) => acc += cur.ringControl, 0);

  
  useEffect(() => { //set new Obj for local round by round data, then pass to parent state
    const newRoundData = () => {
      return {
        [`round`]: roundCount,
          [boxer.firstName]: {
            [`accuracy`]: totalAccuracy,
            [`control`]: getTotalRingControl,
            [`knockdowns`]: boxer.knockdowns
          }
      }
    }
    if (roundOver) {  //set fight data to parent state ONLY once per round, if round is 1-12
      const preserveRoundByRoundData = newRoundData()
      setFinalTotals(prev => [...prev, preserveRoundByRoundData])
    }
  }, [roundOver]);
  

  useEffect(() =>{ //update damage tracking collection
    setEngagementCount(engagementCount + 1)
    let exc = { boxerName, roundCount, engagementCount, exchangeCount, dmgScale }
    setDmgTracker((dmgTracker) => [...dmgTracker, exc]);
  }, [dmgScale, exchangeCount])

  const searchPunches = () => { //use Reduce method to split data from punchCount into individual boxer data for output
    const splitPunchCountByBoxerName = punchCount.reduce((acc, curr) =>{
      if (curr.attacker.name === boxer.firstName) {
        return [...acc, {
          ...curr.attacker,
          round: curr.round}];
      } else if (curr.defender.name === boxer.firstName){
        return [...acc, {
          ...curr.defender,
          round: curr.round}];
      }
    }, []);
    return splitPunchCountByBoxerName;
  }
  
  useEffect(() => {  //run the searchPunches reduce method and set it to state for access below
    const getBoxerData = searchPunches();
    setBoxerPunchData(getBoxerData);
  },[punchCount])

  useEffect(() => {
    if(fightNumber === prevFightNumber+1) {
      if (cornerColor.side === "right"){ //timing delays for opponent
        setTimeout(() => {
          setShow(`show`); //show, fade, hide
        }, 1000);

        setTimeout(() => {
        setFade(`75%`);
        }, 3600);

      } else if (cornerColor.side === "left"){ //timing delays for user
        setTimeout(() => {
          setShow(`show`);
        },  3000);

        setTimeout(() => {
          setFade(`75%`);
        },  7300);
      }
   }
  });
  
  //adjust colors and position of image according to health percentage
  const koColor = (energy) => boxer.hp <= 0 ? `50%` : `${energy}%`
  const flip = () => cornerColor.side !== 'left' ? '' : ''

  const changeColor = (life) => {
    if (life >= 75) {
      return `#00b424`
    } else if (life <= 75 && life > 50) {
      return `#bce920`;
    } else if (life <= 49 && life > 35) {
      return `#fffc1e`;
    } else if (life <= 35 && life > 20) {
      return `#f58000`;
    } else if (life <= 20) {
      return `#e80000`;
    }
  }

  const dmgScaleRegulator = () => { //adjusts percentage of damage for UI animation
    let descale = 100 - dmgScale;
    if (descale >= 100) {
      descale = 100
    } else {
      return descale
    } return descale + 0.5;
  }

  const mapPunchData = () => {
    const maxEngagementRate = () => {
      let rateOfEx = Math.floor(engagementRate*10);
      if (rateOfEx > 100) {
        return 100;
      } else {
        return rateOfEx;
      }
    }

    return (
      <>
        <div className="fight-stats-punches-data">
          <div className="punches-landed-label">
            <h5>Knockdowns:</h5>
          </div>
          <div className="punches-landed-data">
            <h5>{boxer.knockdownCount}</h5>
          </div>

          <div className="punches-landed-label">
            <h5>Accuracy (By Round, Total): </h5>
          </div>
          <div className="punches-landed-data">
            <div className="punches-landed-accuracy-round">
              <h5 className="landed-thrown">{totalPunchesLanded} / {totalPunchesThrown} </h5>
              <h5>( { Math.ceil((totalPunchesLanded / totalPunchesThrown)*100)}% )</h5>
            </div>
            <div className="punches-landed-accuracy-total">
              <h5 className="landed-thrown">{getTotalPunchesLanded} / {getTotalPunchesThrown} </h5>
              <h5>( {Math.ceil((getTotalPunchesLanded/getTotalPunchesThrown)*100)}% )</h5>
            </div>
          </div>

          <div className="punches-landed-label">
            <h5>Engagement Rate:</h5>
          </div>
          <div className="punches-landed-data">
            <h5>{ maxEngagementRate() }%</h5>
          </div>

          <div className="punches-landed-label">
            <h5>Ring Control:</h5>
          </div>
          <div className="punches-landed-data">
            <h5>{ringControl}</h5>
          </div>
        </div>
      </>
    )
  }

  const mainCard =  () => {
    return (
      <>
        <div className="boxer-info border padded" >
          <div className="boxer-info-name">
            <h4 className={'name'} style={{
              backgroundColor: cornerColor.cornerColor }}>
              <em>{boxer.firstName}</em>
            </h4>

            <h4 id={`nickname`} style={{
              fontWeight: `200px`,
              backgroundColor: cornerColor.cornerColor }}>
              <em>"{boxer.nickname}"</em>
            </h4>

            <h4 className={'name'} style={{
              backgroundColor: cornerColor.cornerColor  }}>
              <em>{boxer.lastName}</em>
            </h4>
          </div>

          <div className="boxer-condition" style={{
            backgroundColor: changeColor(life),
            opacity: koColor(energy),
            transform: `scale(${dmgScaleRegulator()}% )` }}>
            <div className={`boxer-condition-body ${flip()}`} //exists if you want to flip a profile pic in future
              style={{
              backgroundColor: changeColor(life), //Change phyiscal condition by color, red is near knockout
              backgroundImage: `url('${path}')`,
              opacity: koColor(energy),
              // transform: `scale(${dmgScaleRegulator()}% )`
            }}>
              <img src={path} alt={'boxer body'}
                className="boxer-pic"
                style={{ 
                transform: `scale(${dmgScaleRegulator()}%)`,
                opacity: koColor(),
              }}/>
              <h5 style={{display: 'flex', position: 'absolute', color: `white`}}>
                {Math.round(boxer.hp)}
                {life}
                {Math.round((boxer.con*100))}
              </h5>
            </div>
          </div>
        </div>

        <div className={`fight-stats border`}>

          <div className="graphs">
            {mapPunchData()}
          </div>
        </div>

        <div className={'boxer-info-profile border padded'} style={{}}>
          <h5 className={`info-titles`}>Height / Weight / Reach:</h5>
          <h5> Height {boxer.weightClass} Reach </h5>
          <h5 className={`info-titles`}>Fighting out of:</h5>
          <h5 className={'info-details'}><em>{boxer.hometown}</em></h5>  
          <h5 className={`info-titles`}>Record:</h5>
          <h5 className={'info-details'}>{boxer.win} - {boxer.loss}</h5>  
          <h5 className={`info-titles`}>Rank:</h5>
          {
            boxer.champion ?
              <span className={`champ`}>
                <h5>CHAMPION</h5> <img src={goldBelt} id={`champ`} alt="CHAMPION"/>
              </span>
              
              : 
              <h5 className={'info-details'}>
                {boxer.rank} <em style={{marginLeft: `3%`}}> ({ commentary.weightClassName(boxer) }) </em>
              </h5>
          }
        </div>
      </>
    )}

  return (
    <>
    <div className="home-gym">
        { //if round count is 0, fight has not begun, display intro cards first
          roundCount === 0 ?
   
            <div className={`intros ${show}`}
              style={{opacity: fade, color: boxer.favoriteColor}}
              onClick={(e) => {
                e.preventDefault();
                showHide(); }}>
              {
                commentary.setIntros({...cornerColor,
                  weightClass: commentary.weightClassName(boxer)},
                  boxer.favoriteColor)
              }
            </div> 

          :
          <div className={`BoxerCard`}>
              {mainCard()}
          </div>
        }
        </div> 
    </>
  )
}

export default BoxerCard