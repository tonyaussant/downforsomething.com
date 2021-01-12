function OptionCard(props) {
  const {index, option, name, img, optionPicked} = props;

  return(
    <div className='choice-card'>
      <div className='choice-card__wrapper'>
        <h2 className='title'>{name}</h2>

        <img className='gif' src={img} alt={name}/>

        <div className='choice-card__button-box'>
          <button className='button choice-card__button' value='yes' onClick={(event) => optionPicked(event, option, index)}>i'm in</button>

          <button className='button choice-card__button' value='no' onClick={(event) => optionPicked(event, option, index)}>i'm out</button>
        </div>
      </div>
    </div>
  );
}

export default OptionCard;