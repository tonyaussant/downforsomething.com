import Header from './elements/Header';
import TopChoice from './elements/TopChoice';
import UserFinished from './UserFinished';

function OptionsTied(props) {
  const {topChoices, phase, users, tieBreakers, tieBreakerPicked} = props;

  if(tieBreakers === 0) {
    return(
      <div>
        <Header/>

        <section className='main options-tied'>
          <div className='main__wrapper'>
            <h1 className='title options-tied__title'>no consensus reached, but your top choices were:</h1>

            <ul className='list'>
              {topChoices.map((choice) => 
              <TopChoice key={choice.id} name={choice.name}/>)}
            </ul>

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
            <h1 className='title options-tied__title'>no consensus reached, but your top choices were:</h1>  

            <ul className='list'>
              {topChoices.map((choice) => 
              <TopChoice key={choice.id} name={choice.name}/>)}
            </ul>

            <h2 className='sub-title options-tied__title'>waiting for rest of group to choose</h2>

            <UserFinished phase ={phase} users={users}/>
          </div>
        </section>
      </div>
    );
  }
}

export default OptionsTied;