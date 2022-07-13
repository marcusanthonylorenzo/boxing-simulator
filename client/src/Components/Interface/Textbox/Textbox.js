import React from 'react'
import './Textbox.css'

const Textbox = ({ input, getAttacker, ko }) => {

  const done = "ITS OVER";

  return (
    <div className="textbox"
      style={{ backgroundColor: getAttacker.favoriteColor}}>
      {ko ? input.text = done : input.text}
    </div>
  )
}

export default Textbox