function ChoiceCard(props) {
  const {index, option, name, img} = props;

  return(
    <div>
      <img src={img} alt=""/>
      <h2>{name}</h2>
      <button value='yes' onClick={(event) => this.props.clickHandler(event, option, index)}>I'm in</button>
      <button value='no' onClick={(event) => this.props.clickHandler(event, option, index)}>I'm out</button>
    </div>
  );
}

export default ChoiceCard;