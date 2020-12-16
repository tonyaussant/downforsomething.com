import {Link} from 'react-router-dom';
import Header from './children/Header';

function Lobby(props) {
  const {planCode, name} = props.match.params;

  return(
    <div>
      <Header/>
      <section className='main lobby'>
        <div className='main__wrapper'>
          <h1 className='title lobby__title'>plan code: {planCode}</h1>
          <Link className='button' to={`/choices/phase1/${planCode}/${name}`}>
            start
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Lobby;