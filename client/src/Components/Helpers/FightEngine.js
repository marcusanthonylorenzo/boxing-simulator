import { useState } from 'react'
import SelectMenu from '../Interface/SelectMenu/SelectMenu'
// import Commentary from './Commentary'

const FightEngine = ({ user, enemy }) => {

  const [userHp, setUserHp] = useState();
  const [enemyHp, setEnemyHp] = useState();


  //exchange() determines who wins the trading of blows

  const exchange = (attacker, defender) => {
    
    let atk = attacker.attack();
    let def = defender.defend();
    let difference = atk - def;

    //first conditions will check negative difference, if true, attacker pays a price for attacking first

    //COMMENTARY GOES HERE

    if (difference <= -5){
      attacker.hp += difference;
      console.log(attacker.hp, `${defender.firstName} returning heavy fire!`)
    } else if (difference >= -5 && difference <= -1){
      attacker.hp += difference;
      console.log(attacker.hp, `${defender.firstName} making ${attacker.firstName} pay on the way in`)
    }else if (difference === 0) {
      defender.hp -= 0;
      console.log(`${attacker.firstName} misses! ${defender.hp}`);
      return;
    } else if (difference >= 1 && difference <= 5) {
      defender.hp -= difference;
      console.log(`good back and forth action.`);
      console.log(attacker.firstName, atk, defender.firstName, def,`hp: ${defender.hp}`);
    } else if (difference > 5) {
      defender.hp -= difference;
      console.log(`${attacker.firstName} laying on the hurt!`);
      console.log(attacker.firstName, atk, defender.firstName, def,`hp: ${defender.hp}`);
    }
  }


  //engagement determines who initiates the attack

  const engagement = (user, opp) => {
    
    let userOffense = user.engage();
    let oppOffense = opp.engage();

    if (userOffense > oppOffense) {
      exchange(user, enemy)
      setEnemyHp(opp.hp)
    } else if (oppOffense > userOffense) {
      exchange(opp, user)
      setUserHp(user.hp)
    }
  }

  const fightBtn = <button className="fight-button" onClick={()=> {
      engagement(user, enemy)
      setUserHp(user.hp) }}><h4>Fight</h4>
      </button>

  return (
    <>

      {userHp} {enemyHp}

      <SelectMenu show={true} buttons={fightBtn} />
      
    </>
  )

}

export default FightEngine