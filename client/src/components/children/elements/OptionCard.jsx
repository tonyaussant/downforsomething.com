function OptionCard(props) {
  const {index, option, name, img, optionPicked} = props;

  return(
    <li className='option-card'>
      <div className='option-card__wrapper'>
        <h2 className='title'>{name}</h2>

        <img className='gif' src={img} alt={name}/>

        <div className='option-card__button-box'>
          <button className='button option-card__button' value='yes' onClick={(event) => optionPicked(event, option, index)}>i'm in</button>

          <button className='button option-card__button' value='no' onClick={(event) => optionPicked(event, option, index)}>i'm out</button>
        </div>
      </div>
    </li>
  );
}

export default OptionCard;