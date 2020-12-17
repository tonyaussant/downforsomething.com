function LinkCard(props) {
  return(
    <div className='link-card'>
      <h3 className='text link-card__name'>{props.name}</h3>
      <a target='_blank' rel='noreferrer' href={props.url} className='text link-card__url' >{props.url}</a>
    </div>
  );
}

export default LinkCard;