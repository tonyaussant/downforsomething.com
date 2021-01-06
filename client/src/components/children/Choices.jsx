import Header from './Header';
import ChoiceCard from './ChoiceCard';

function Choices(props) {
  return(
    <div>
      <Header/>

      {props.phaseData.map((choice, index) => 
      <ChoiceCard key={choice.id}  index={index} option={choice.option} name={choice.name} img={choice.img} choiceMade={props.choiceMade}/>)}
    </div>
  );
}

export default Choices;