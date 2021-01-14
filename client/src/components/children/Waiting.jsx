import Header from './elements/Header';
import UserFinished from './UserFinished';

function Waiting(props) {
  const {phase, users} = props;

  return(
    <div>
      <Header/>

      <div className='main'>
        <div className='main__wrapper'>
          <h1 className='title lobby__title'>waiting for rest of group to choose</h1>

          <UserFinished phase={phase} users={users}/>
        </div>
      </div>
    </div>
  );
}

export default Waiting;