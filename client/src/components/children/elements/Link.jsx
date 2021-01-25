function Link(props) {
  return(
    <li className='link'>
      <h3 className='text link__name'>{props.name}</h3>
      <a className='text link__url' rel='noreferrer' target='_blank' href={props.url}>{props.url}</a>
    </li>
  );
}

export default Link;