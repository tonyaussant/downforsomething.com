import {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Header from './children/Header';
import ChoiceCard from './children/ChoiceCard';

class Choices extends Component {
  state = {
    phaseData: [],
    option1: 0,
    option2: 0,
    option3: 0,
    pageLoad: false
  }

  componentDidMount() {
    this.getPhaseData(this.props.match.params.phase);
  }

  getPhaseData(phase) {
    axios.get(`http://localhost:8080/${phase}`)
    .then((result) => {
      this.setState({
        phaseData: result.data,
        pageLoad: true
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  choiceMade = (event, option, index) => {
    const optionPicked = `option${option}`
    const btnPressed = event.target.value;
    const phaseDataUpdate = this.state.phaseData;
    phaseDataUpdate.splice(index, 1);
    if(btnPressed === 'yes') {
      this.setState({
        phaseData: phaseDataUpdate,
        [optionPicked]: this.state[optionPicked] + 1
      });
    } else {
      this.setState({
        phaseData: phaseDataUpdate,
      });
    }
  }

  render() {
    if(this.state.phaseData[0] || this.state.pageLoad === false) {
      return(
        <div>
          <Header/>
          {this.state.phaseData.map((choice, index) => <ChoiceCard key={choice.id}  index={index} option={choice.option} name={choice.name} img={choice.img} clickHandler={this.choiceMade}/>)}
        </div>
      );
    } else if(this.props.match.params.phase === 'phase1'){
      return(
        <Redirect to={`/waitingroom/phase2`}/>
      );
    }
  }
}

export default Choices;