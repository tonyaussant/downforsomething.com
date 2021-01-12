import Header from './elements/Header';

function OptionsTied(props) {
  if(props.tieBreakers === 0) {
    return(
      <div>
        <Header/>

        <section className='main choices'>
          <div className='main__wrapper'>
            <h1 className='title choices__title'>{`the most popular choices are ${props.nameOne} and ${props.nameTwo}`}</h1>
            <h2 className='sub-title lobby__title'>click whichever button represents how you would like to break the tie</h2>
            
            <button className='button choices__button' value='retry' onClick={(event) => props.tieBreakerPicked(event)}>retry phase</button>
            <button className='button choices__button' value='random' onClick={(event) => props.tieBreakerPicked(event)}>random option</button>
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
            <h1 className='title choices__title'>{`the most popular choices are ${props.nameOne} and ${props.nameTwo}`}</h1>       
            <h2 className='sub-title lobby__title'>waiting for rest of group to choose</h2>
          </div>
        </section>
      </div>
    );
  }
}

export default OptionsTied;