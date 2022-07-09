// import Commentary from './Commentary'

const FightEngine = ({ user, enemy, userHp, enemyHp, setUserHp, setEnemyHp }) => {

  //exchange() determines who wins the trading of blows

  const exchange = (attacker, defender) => {

    let atk = attacker.attack();
    let def = defender.defend();
    let difference = atk - def;

    if (difference <= 0) {
      console.log(`${attacker.firstName} misses!`);
      return;
    } else if (difference >= 1 && difference <= 10) {
      defender.hp -= difference;
      console.log(`good back and forth action.`);
      console.log(attacker.firstName, atk, defender.firstName, def,`hp: ${defender.hp}`);
    } else if (difference > 10) {
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
      exchange(user, opp)
      console.log(opp.hp)
    } else if (oppOffense > userOffense) {
      exchange(opp, user)
      console.log(user.hp)
    }
  }

  return (
    <>

      {userHp} {enemyHp}

      <button className="Fight Button" onClick={(e) => {
        e.preventDefault();
        engagement(user, enemy);
      }}><h4>Fight</h4></button>
    </>
  )

}

export default FightEngine