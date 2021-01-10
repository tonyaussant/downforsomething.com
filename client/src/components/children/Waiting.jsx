import Header from './elements/Header';

function Waiting() {
  return(
    <div>
      <Header/>

      <div className='main'>
        <h1 className='title main__wrapper'>waiting for rest of group to choose</h1>
      </div>
    </div>
  );
}

export default Waiting;