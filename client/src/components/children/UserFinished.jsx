import UserFinishedCard from './elements/UserFinishedCard';

function UserFinished(props) {
  const {phase, users} = props;

  return(
    <ul className='list'>
      {users
        .filter((user) => ((phase === 'phase1' && user.phase1Done) || (phase === 'phase2' && user.phase2Done) || (phase === 'tieBreaker' && user.tieBreakerDone)))
        .map((user) => (<UserFinishedCard key={user.id} name={user.name}/>))}
    </ul>
  );
}

export default UserFinished;