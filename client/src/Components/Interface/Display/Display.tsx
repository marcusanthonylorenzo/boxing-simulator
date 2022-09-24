import React from 'react';
import ClickyBoi from "../../Button/ClickyBoi.tsx";
import FightEngine from "../../FightEngine/FightEngine.tsx";
import Data from "../../Helpers/Data";
// import Navbar from "../Navbar/Navbar";

const Display = () => { //UI for match

  const { user, enemy } = Data(); //Data Fetch (hardcoded)
  const { fight, PBP } = FightEngine(user, enemy); //Game Engine

  return (
    <div>
      {/* <Navbar /> */}
      <ClickyBoi buttonText={"clickerz"} buttonCallback={() => fight()} />

      {PBP ? PBP.map(each => {
        console.log(each)
        return (
          <div className={`display-pbp`}
            style={{
              color: `white`,
              display: `flex`, flexDirection: `column`, width: `30vw` //TEMP
            }}
          >
            {Object.entries(each)}
          </div>
        )
      }) : null}

    </div>
  )
}

export default Display