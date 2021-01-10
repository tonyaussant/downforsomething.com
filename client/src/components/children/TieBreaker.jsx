import TwoWayTie from './TwoWayTie';
import ThreeWayTie from './ThreeWayTie';

function TieBreaker(props) {
  const {user, topChoices, retryPhase, retryWithTwo, pickRandom} = props

  if(topChoices.length === 2) {
    return(
      <TwoWayTie user={user} nameOne={topChoices[0].name} nameTwo={topChoices[1].name} retryPhase={retryPhase} retryWithTwo={retryWithTwo} pickRandom={pickRandom}/>
    );
  } else if(topChoices.length === 3) {
    return(
      <ThreeWayTie user={user} retryPhase={retryPhase} pickRandom={pickRandom}/>
    );
  }
}

export default TieBreaker;