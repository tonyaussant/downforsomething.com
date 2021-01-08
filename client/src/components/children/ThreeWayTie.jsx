import Header from './elements/Header';

function ThreeWayTie(props) {
  if(props.user === 'primary') {
    return(
      <div>
        <Header/>
  
        <section className='main choices'>
          <div className='main__wrapper'>
            <h1 className='title choices__title'>no consensus reached</h1>
            
            <button className='button choices__button' onClick={() => props.retryPhase()}>retry</button>
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
            <h1 className='title choices__title'>no consensus reached</h1>
            
            <h2 className='sub-title lobby__title'>the group leader will now decide how to break the tie</h2>
          </div>
        </section>
      </div>
    );
  }
}

export default ThreeWayTie;