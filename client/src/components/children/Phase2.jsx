import {Redirect} from 'react-router-dom';
import Loading from './Loading';
import Waiting from './Waiting';
import PrePhase from './PrePhase';
import Options from './Options';
import TieBreaker from './TieBreaker';

function Phase2(props) {
  const {planCode, name} = props.params;
  const {winnerData, phaseData, topChoices, users, tieBreakers, pageLoaded, phase2WinnerID} = props.state;
  const {loadPage, optionPicked, tieBreakerPicked, restartPhase} = props.functions;

  if(phase2WinnerID) {
    return(
      <Redirect to={`/results/${phase2WinnerID}/${planCode}/${name}`}/>
    );
  } else if(!pageLoaded) {
    if(winnerData.id) {
      return(
        <PrePhase winnerData={winnerData} displayName={name} loadPage={loadPage}/>
      );
    } else {
      return(
        <Loading/>
      );
    }
  } else if(topChoices[0]) {
    return(
      <TieBreaker phase='phase2' topChoices={topChoices} users={users} tieBreakers={tieBreakers} tieBreakerPicked={tieBreakerPicked}/>
    );
  } else if(phaseData[0]) {
    return(
      <Options phase='phase2' phaseData={phaseData} optionPicked={optionPicked} restartPhase={restartPhase}/>
    );
  } else {
    return(
      <Waiting phase='phase2' users={users}/>
    );
  }
}

export default Phase2;