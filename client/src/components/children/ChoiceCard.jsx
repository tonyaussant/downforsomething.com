function ChoiceCard(props) {
  const {index, option, name, img, clickHandler} = props;

  return(
    <div className='choice-card'>
      <div className='choice-card__wrapper'>
        <h2>{name}</h2>

        <img className='gif' src={img} alt={name}/>

        <div className='choice-card__button-box'>
          <button className='button choice-card__button' value='yes' onClick={(event) => clickHandler(event, option, index)}>i'm in</button>

          <button className='button choice-card__button' value='no' onClick={(event) => clickHandler(event, option, index)}>i'm out</button>
        </div>
      </div>
    </div>
  );
}

export default ChoiceCard;