import Header from './elements/Header';

function TwoWayTie(props) {
  if(props.user === 'primary') {
    return(
      <div>
        <Header/>
  
        <section className='main choices'>
          <div className='main__wrapper'>
            <h1 className='title choices__title'>{`the most popular choices are ${props.nameOne} and ${props.nameTwo}`}</h1>
            
            <button className='button choices__button' onClick={() => props.retryPhase()}>retry</button>
            <button className='button choices__button' onClick={() => props.retryWithTwo()}>retry with top choices</button>
            <button className='button choices__button' onClick={() => props.pickRandom()}>pick random</button>
          </div>
        </section>
      </div>
    );
  } else {
    return(
      <div>
        <Header/>
  
        <section className='main choices'>
          <div className='main__wrapper'>
            <h1 className='title choices__title'>{`the most popular choices are ${props.nameOne} and ${props.nameOne}`}</h1>
            
            <h2 className='sub-title lobby__title'>the group leader will now decide how to break the tie</h2>
          </div>
        </section>
      </div>
    );
  }
}

export default TwoWayTie;