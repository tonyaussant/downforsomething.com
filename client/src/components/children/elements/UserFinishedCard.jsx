function UserFinishedCard(props) {
  return(
    <li className='text list__text'>{`${props.name} is finished choosing`}</li>
  );
}

export default UserFinishedCard;