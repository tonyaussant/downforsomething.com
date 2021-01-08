import Header from './elements/Header';
import OptionCard from './elements/OptionCard';

function Options(props) {
  return(
    <div>
      <Header/>

      {props.phaseData.map((choice, index) => 
      <OptionCard key={choice.id}  index={index} option={choice.option} name={choice.name} img={choice.img} choiceMade={props.choiceMade}/>)}
    </div>
  );
}

export default Options;