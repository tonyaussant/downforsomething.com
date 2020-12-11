import {Link} from 'react-router-dom';
import Header from './children/Header';

function WaitingRoom(props) {
  const {params} = props.match;

  return(
    <div>
      <Header/>
      <Link to={`/choices/${params.phase}`}>
        Start
      </Link>
    </div>
  );
}

export default WaitingRoom;