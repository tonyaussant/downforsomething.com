import Header from './elements/Header';
import OptionCard from './elements/OptionCard';

function Options(props) {
  const {phase, phaseData, optionPicked, restartPhase} = props

  return(
    <div>
      <Header phase={phase} restartPhase={restartPhase}/>

      {phaseData.map((choice, index) => 
      <OptionCard key={choice.id}  index={index} option={choice.option} name={choice.name} img={choice.img} optionPicked={optionPicked}/>)}
    </div>
  );
}

export default Options;