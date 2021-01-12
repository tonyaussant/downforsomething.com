import OptionsTied from './OptionsTied';
import NoConsensus from './NoConsensus';

function TieBreaker(props) {
  const {phase, topChoices, tieBreakers, tieBreakerPicked} = props

  if((phase === 'phase1' && topChoices.length === 3) || topChoices.length === 5) {
    return(
      <NoConsensus tieBreakers={tieBreakers} tieBreakerPicked={tieBreakerPicked}/>
    );
  } else {
    return(
      <OptionsTied nameOne={topChoices[0].name} nameTwo={topChoices[1].name} tieBreakers={tieBreakers} tieBreakerPicked={tieBreakerPicked}/>
    );
  }
}

export default TieBreaker;