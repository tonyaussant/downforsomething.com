import Header from './elements/Header';
import OptionCard from './elements/OptionCard';

function Options(props) {
  const {phase, phaseData, optionPicked, restartPhase} = props

  return(
    <div>
      <Header phase={phase} restartPhase={restartPhase}/>

      <div className='options'>
        <ul className='options__list'>
          {phaseData.map((choice, index) => 
          <OptionCard key={choice.id}  index={index} option={choice.option} name={choice.name} img={choice.img} optionPicked={optionPicked}/>)}
        </ul>
      </div>
    </div>
  );
}

export default Options;