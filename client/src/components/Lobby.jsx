import {Link} from 'react-router-dom';
import Header from './children/Header';

function Lobby(props) {
  const {roomCode, displayName} = props.match.params;

  return(
    <div>
      <Header roomCode={roomCode} displayName={displayName}/>
      <h2>{roomCode}</h2>
      <Link to={`/choices/phase1/${roomCode}/${displayName}`}>
        Start
      </Link>
    </div>
  );
}

export default Lobby;