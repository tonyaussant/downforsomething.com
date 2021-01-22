function Link(props) {
  return(
    <li className='link'>
      <h3 className='text link__name'>{props.name}</h3>
      <a rel='noreferrer' href={props.url} className='text link__url' >{props.url}</a>
    </li>
  );
}

export default Link;