import Header from './elements/Header';

function TwoWayTie(props) {
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
}

export default TwoWayTie;