import React, { useState } from 'react';

const useFightState = () => {

  const [aggressor, setAggressor] = useState();
  const [counterStriker, setCounterStriker] = useState();

  const calcAggressor = async (boxerOne, boxerTwo) => {	//which boxer has the highest agr, ie. boxerOne wins
    try {
      const boxerOneAgr = await boxerOne.agr;
      const boxerTwoAgr = await boxerTwo.agr;
      console.log(`agr rolled useFightState`, boxerOneAgr, boxerTwoAgr);

      const setAggressorAndCounter = (aggressiveBoxer, counterBoxer) => {
        setAggressor(aggressiveBoxer);
        setCounterStriker(counterBoxer);
      }

      boxerOneAgr >= boxerTwoAgr ? setAggressorAndCounter(boxerOne, boxerTwo) : setAggressorAndCounter(boxerTwo, boxerOne);

    } catch {
      // boxersReset(); //clinch, disengage, or no damage
      console.log(`error in useFightState`);
    }
  };

  return { aggressor, counterStriker, calcAggressor }
}

export default useFightState