import {Redirect} from 'react-router-dom';
import Waiting from './Waiting';
import PrePhase from './PrePhase';
import Options from './Options';
import TieBreaker from './TieBreaker';

function Phase1(props) {
  const {planCode, name} = props.params;
  const {phaseData, topChoices, pageLoaded, phase1WinnerID} = props.state;
  const {loadPage, retryPhase, retryWithTwo, pickRandom, choiceMade} = props.functions;

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
      <TieBreaker topChoices={topChoices} retryPhase={retryPhase} retryWithTwo={retryWithTwo} pickRandom={pickRandom}/>
    );
  } else if(phaseData[0]) {
    return(
      <Options phaseData={phaseData} choiceMade={choiceMade}/>
    );
  } else {
    return(
      <Waiting/>
    );
  }
}

export default Phase1;