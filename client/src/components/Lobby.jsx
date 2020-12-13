import {Link} from 'react-router-dom';
import Header from './children/Header';

function Lobby() {
  return(
    <div>
      <Header/>
      <Link to={`/phase1`}>
        Start
      </Link>
    </div>
  );
}

export default Lobby;