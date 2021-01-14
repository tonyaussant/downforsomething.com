import OptionsTied from './OptionsTied';
import NoConsensus from './NoConsensus';

function TieBreaker(props) {
  const {phase, topChoices, users, tieBreakers, tieBreakerPicked} = props

  if((phase === 'phase1' && topChoices.length === 3) || topChoices.length === 5) {
    return(
      <NoConsensus phase='tieBreaker' users={users} tieBreakers={tieBreakers} tieBreakerPicked={tieBreakerPicked}/>
    );
  } else {
    return(
      <OptionsTied topChoices={topChoices} phase='tieBreaker' users={users} tieBreakers={tieBreakers} tieBreakerPicked={tieBreakerPicked}/>
    );
  }
}

export default TieBreaker;