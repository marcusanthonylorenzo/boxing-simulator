// import Commentary from './Commentary'

const fightEngine =  (user, opp) => {

  const exchange = (attacker, defender) => {

    let atk = attacker.attack();
    let def = defender.defend();
    let difference = atk - def;

    if (difference < 1) {
      console.log(`${attacker.firstName} misses!` , attacker.firstName, atk, defender.firstName, def)
    } else if (difference <= 10) {
      console.log(`good back and forth action.`, attacker.firstName, atk, defender.firstName, def)
    } else if (difference > 10) {
      console.log(`${attacker.firstName} laying on the hurt!`, attacker.firstName, atk, defender.firstName, def)
    }
  }

  let userOffense = user.engage();
  let oppOffense = opp.engage();

  if (userOffense > oppOffense) {
    exchange(user, opp)
  } else if (oppOffense > userOffense) {
    exchange(opp, user)
  }

}

export default fightEngine