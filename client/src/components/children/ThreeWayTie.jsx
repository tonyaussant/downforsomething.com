import Header from './elements/Header';

function ThreeWayTie(props) {
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
}

export default ThreeWayTie;