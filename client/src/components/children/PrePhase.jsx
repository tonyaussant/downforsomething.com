import Header from './elements/Header';

function PrePhase(props) {
  const {loadPage} = props;
  
  if(props.winnerData) {
    const {name, img} = props.winnerData;

    return(
      <div>
        <Header/>

        <section className='main'>
          <div className='main__wrapper'>
            <h1 className='title'>{`the most popular choice is ${name}`}</h1>

            <img className='gif' src={img} alt={name}/>

            <button className='button choices__button' onClick={() => loadPage()}>continue</button>
          </div>
        </section>
      </div>
    );
  } else {
    const {displayName} = props;

    return(
      <div>
        <Header/>
  
        <section className='main'>
          <div className='main__wrapper'>
            <h1 className='sub-title paragraph'>{`hey ${displayName},`}</h1>
            <p className='sub-title paragraph'>you will now be given some options for what your group wants to do together</p>
            <p className='sub-title directions'>select "i'm in" for as many options that you are up for</p>
  
            <button className='button' onClick={() => loadPage()}>start</button>
          </div>
        </section>
      </div>
    );
  }
}

export default PrePhase;