import Header from './elements/Header';
import UserFinished from './UserFinished';

function NoConsensus(props) {
  const {phase, users, tieBreakers, tieBreakerPicked} = props;


  if(tieBreakers === 0) {
    return(
      <div>
        <Header/>
  
        <section className='main options-tied'>
          <div className='main__wrapper'>
            <h1 className='title options-tied__title'>no consensus reached. all options received the same amount of votes</h1>
            <h2 className='sub-title options-tied__title'>click whichever button represents how you would like to break the tie</h2>
            
            <button className='button options-tied__button' value='retry' onClick={(event) => tieBreakerPicked(event)}>retry</button>
            <button className='button options-tied__button' value='random' onClick={(event) => tieBreakerPicked(event)}>random option</button>
          </div>
        </section>
      </div>
    );
  } else {
    return(
      <div>
        <Header/>
  
        <section className='main options-tied'>
          <div className='main__wrapper'>
            <h1 className='title options-tied__title'>no consensus reached. all options received the same amount of votes</h1> 
            <h2 className='sub-title options-tied__title'>waiting for rest of group to choose</h2>

            <UserFinished phase ={phase} users={users}/>
          </div>
        </section>
      </div>
    );
  }
}

export default NoConsensus;