import Header from './elements/Header';

function PrePhase(props) {
  if(props.parentID) {
    <div>
      <Header/>

      <section className='main'>
        <div className='main__wrapper'>
          <h1 className='title'>{`the most popular choice is ${props.topChoices[0].name}`}</h1>

          <img className='gif' src={props.topChoices[0].img} alt={props.topChoices[0].name}/>

          <button className='button choices__button' onClick={() => this.startPhase2(props.topChoices[0].id)}>continue</button>
        </div>
      </section>
    </div>
  }
  return(
    <div>
      <Header/>

      <section className='main'>
        <div className='main__wrapper'>
          <h1 className='sub-title paragraph'>{`hey ${props.name},`}</h1>
          <p className='sub-title paragraph'>you will now be given some options for what your group wants to do together</p>
          <p className='sub-title directions'>select "i'm in" for as many options that you are up for</p>

          <button className='button' onClick={() => props.startPhase()}>start</button>
        </div>
      </section>
    </div>
  );
}

export default PrePhase;