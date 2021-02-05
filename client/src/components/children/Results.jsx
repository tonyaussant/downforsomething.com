import Header from './elements/Header';
import Loading from './Loading';
import Link from './elements/Link';

function Results(props) {
  const {phase2WinnerData, resultsData, pageLoaded} = props.state;

  if(!pageLoaded) {
    return(
      <Loading/>
    );
  } else {
    const {name, img} = phase2WinnerData;

    return(
      <div>
        <Header/>

        <section className='main'>
          <div className='main__wrapper'>
            <h1 className='title'>{`the group has chosen to ${name}!`}</h1>

            <img className='gif gif--main' src={img} alt={name}/>

            <h2 className='sub-title'>here are some suggestions to help you have the best time:</h2>

            <ul className='list'>
              {resultsData.map((link) =>
              <Link key={link.id} name={link.name} url={link.url}/>)}
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Results;