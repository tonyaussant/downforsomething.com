import Header from './elements/Header';
import Loading from './Loading';
import LinkCard from './elements/LinkCard';

function Results(props) {
  const {winnerData, resultsData, pageLoaded} = props.state;

  if(!pageLoaded) {
    return(
      <Loading/>
    );
  } else {
    return(
      <div>
        <Header/>

        <section className='main'>
          <div className='main__wrapper'>
            <h1 className='title'>{`the group has chosen to ${winnerData.name}!`}</h1>

            <img className='gif' src={winnerData.img} alt={winnerData.name}/>

            <h2 className='sub-title'>here are some suggestions to help you have the best time:</h2>

            {resultsData.map((link) =>
            <LinkCard key={link.id} name={link.name} url={link.url}/>)}
          </div>
        </section>
      </div>
    );
  }
}

export default Results;