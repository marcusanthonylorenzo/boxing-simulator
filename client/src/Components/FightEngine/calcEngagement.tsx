// import PBP from "../PBP";

/*
  !! import commentary and PBP here and render off value off primary/secondary damage
*/

export const calcEngagement = async (attacker, defender) => {//results of engagement
  //primary attack
  const attack = await attacker.handSpeed() * attacker.pow;
  const defense = await defender.eva;

  //secondary attack
  const counter = await defender.counter * attacker.pow; //THESE NEED TO BE FUNCTIONS
  const recounter = await attacker.eva;

  //calc primary and secondary atk results
  const primaryDamage = attack - defense;
  const secondaryDamage = counter - recounter;

  // try {
  //   console.log(attacker.firstName + ` dmg:`, primaryDamage, defender.firstName + ` dmg:`, secondaryDamage);
  // } catch {
  //   console.log(`error`);
  // }

  //import PBP {} commentary and pass aggressor, defender as args
  // primaryDamage < 1 ? PBP.missed(attacker) : PBP.Commentary(attacker, primaryDamage)
  // secondaryDamage < 1 ? PBP.missed(defender) : PBP.commentary(defender, secondaryDamage)

  return {
    [attacker.firstName]: primaryDamage,
    [defender.firstName]: secondaryDamage
  };
};
