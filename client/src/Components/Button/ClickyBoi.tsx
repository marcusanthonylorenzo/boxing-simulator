import React from 'react';

//Linter is ok
const ClickyBoi: React.FC = ({ buttonText, buttonCallback }: { buttonText: string, buttonCallback: any }) => {
  return (
    <>
      <button
        className="clicky-boi"
        onClick={buttonCallback}
      >
        {buttonText}
      </button>
    </>
  )
}

export default ClickyBoi;
