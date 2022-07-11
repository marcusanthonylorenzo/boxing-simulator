const Commentary = () => {

  const weightClassName = (boxer) => {
    const weight = parseInt(boxer.weightClass);

    if (weight >= 108 && weight < 112){
      return "Light-Flyweight"
    } else if (weight >= 112 && weight < 115){
      return "Flyweight"
    } else if (weight >= 115 && weight < 118){
      return "Super-Flyweight"
    } else if (weight >= 118 && weight < 122){
      return "Bantamweight"
    } else if (weight >= 122 && weight < 126){
      return "Super-Bantamweight"
    } else if (weight >= 126 && weight < 130){
      return "Featherweight"
    } else if (weight >= 130 && weight < 135){
      return "Super-Featherweight"
    } else if (weight >= 135 && weight < 140){
      return "Lightweight"
    } else if (weight >= 140 && weight < 147){
      return "Light-Welterweight"
    } else if (weight >= 147 && weight < 154){
      return "Welterweight"
    } else if (weight >= 154 && weight < 160){
      return "Light-Middleweight"
    } else if (weight >= 160 && weight < 168){
      return "Middleweight"
    } else if (weight >= 168 && weight < 175){
      return "Super-Middleweight"
    } else if (weight >= 175 && weight < 200){
      return "Light-Heavyweight"
    } else if (weight >= 200 && weight < 205){
      return "Cruiserweight"
    } else if (weight >= 205 && weight < 112){
      return "Heavyweight"
    } 
  }

const setIntros = (person, colorOfTrunks) => {
  const arrayIntro = [
    <h4>IN the <span style={{color: person.cornerColor, opacity: `90%`}}>{person.cornerColorLabel} corner</span>.</h4>,
    <h4>Wearing the {colorOfTrunks} trunks.</h4>,
    <h4>{ !person.champion ? <h4>The {person.weightClass} CHAMPION of the WORLD</h4> : <h4>The number {person.rank} ranked fighter in the {person.weightClass} division...</h4> }</h4>,
    <h4>Fighting out of {person.hometown.toUpperCase()}...</h4>,
    <h3>{person.firstName.toUpperCase()}</h3>,
    <h3>{person.nickname}</h3>, 
    <h3>{person.lastName.toUpperCase()}</h3>
  ];
  return epicIntros(arrayIntro)
}

const epicIntros =(whatToIntro) => {
  //remember not to use index as keys next time!
  return whatToIntro.map((item, i) => {
    return (
      <div className="intro-text-box" key={i}>
        {item}
      </div>
    )
  })
}

return { weightClassName, setIntros}
}

export default Commentary