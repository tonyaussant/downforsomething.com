import {Redirect} from 'react-router-dom';
import Waiting from './Waiting';
import PrePhase from './PrePhase';
import Options from './Options';
import TieBreaker from './TieBreaker';

function Phase1(props) {
  const {planCode, name} = props.params;
  const {phaseData, topChoices, users, tieBreakers, pageLoaded, phase1WinnerID} = props.state;
  const {loadPage, optionPicked, tieBreakerPicked, restartPhase} = props.functions;

  if(phase1WinnerID) {
    return(
      <Redirect to={`/phase2/${phase1WinnerID}/${planCode}/${name}`}/>
    );
  } else if(!pageLoaded) {
    return(
      <PrePhase displayName={name} loadPage={loadPage}/>
    );
  } else if(topChoices[0]) {
    return(
      <TieBreaker phase='phase1' topChoices={topChoices} users={users} tieBreakers={tieBreakers} tieBreakerPicked={tieBreakerPicked}/>
    );
  } else if(phaseData[0]) {
    return(
      <Options phase='phase1' phaseData={phaseData} optionPicked={optionPicked} restartPhase={restartPhase}/>
    );
  } else {
    return(
      <Waiting phase='phase1' users={users}/>
    );
  }
}

export default Phase1;