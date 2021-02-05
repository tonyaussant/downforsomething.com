import Header from './elements/Header';

function PrePhase(props) {
  const {winnerData, displayName, loadPage} = props;
  
  if(winnerData) {
    const {name, img} = winnerData;
    
    return(
      <div>
        <Header/>

        <section className='main'>
          <div className='main__wrapper'>
            <h1 className='title'>{`the most popular choice is ${name}`}</h1>

            <img className='gif gif--main' src={img} alt={name}/>

            <button className='button choices__button' onClick={() => loadPage()}>continue</button>
          </div>
        </section>
      </div>
    );
  } else {
    return(
      <div>
        <Header/>
  
        <section className='main directions'>
          <div className='main__wrapper'>
            <h1 className='sub-title directions__text'>{`hey ${displayName},`}</h1>
            <h2 className='sub-title directions__text directions__text--normal'>you will now be given some options for what your group wants to do together</h2>
            <h2 className='sub-title directions__text directions__text--normal'>select "i'm in" for as many options that you are up for</h2>
  
            <button className='button directions__button' onClick={() => loadPage()}>start</button>
          </div>
        </section>
      </div>
    );
  }
}

export default PrePhase;