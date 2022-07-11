import React from 'react'
import './Textbox.css'

const Textbox = ({ input, getAttacker, user, opp }) => {

  const joinOpponentsToFilter = [user, opp];

  const filterByName = () => {
    return joinOpponentsToFilter.filter(obj => {
      if (obj.id === getAttacker.id)
          // !obj.firstName ||
          // !getAttacker.firstName)
      {
          return obj
      }
    })
  };

  // const filterByKeyword = (input) => {
  //   return joinOpponentsToFilter.filter(obj => {
  //     if (scrap.text.includes(input)) {
  //       console.log(scrap.text, input, obj)
  //       return obj
  //     }
  //   })
  // };


  let getMatch = filterByName()
  // const checkReturnFire = filterByKeyword(getMatch[0].firstName)

  return (
    <div className="textbox"
      style={{
        backgroundColor: getMatch[0].cornerColor,
        display: `flex`,
        position: `relative`,
        justifyContent: `${getMatch[0].side}`,
        [getMatch[0].side]: `-15%`,
    }}>
      {input.text}
    </div>
  )
}

export default Textbox