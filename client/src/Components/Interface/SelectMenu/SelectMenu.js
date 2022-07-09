import React, { useState, useEffect } from 'react'

const SelectMenu = ( props ) => {

  //To reuse, pass props as buttons={ whateverProp to render return below }
  
  const [show, setShow] = useState(props.show);

  useEffect(() => {
      setTimeout(() => {
        setShow(false);
      }, 3000);
    });

  return (

    <div className={show ? "SelectMenu display-block" : "SelectMenu display-none"}>
      <div className="select-menu">
        {props.buttons}
      </div>
    </div>

  );

}

export default SelectMenu