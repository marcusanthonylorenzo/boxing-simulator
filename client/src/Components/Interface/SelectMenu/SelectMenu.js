import React, { useState, useEffect } from 'react'
import './SelectMenu.css'

const SelectMenu = ({ buttons, fightStart }) => {

  return (
      <div className="select-menu">
        {buttons}
      </div>
  );

}

export default SelectMenu