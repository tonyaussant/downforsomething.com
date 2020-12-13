import {Component} from 'react';
import axios from 'axios';
import Header from './children/Header';
import ChoiceCard from './children/ChoiceCard';

class Phase2 extends Component {
  state = {
    phaseData: [],
    option1: 0,
    option2: 0,
    option3: 0,
    pageLoad: false
  }

  componentDidMount() {
    this.getPhase2Data(this.props.match.params.parentID);
  }

  getPhase2Data(parentID) {
    axios.get(`http://localhost:8080/phase1/${parentID}/phase2`)
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

  checkConsensus() {
    const option1 = this.state.option1;
    const option2 = this.state.option2;
    const option3 = this.state.option3;
    if(option1 > option2 && option1 > option3) {
      return 'option1';
    } else if(option2 > option1 && option2 > option3) {
      return 'option2';
    } else if(option3 > option1 && option3 > option2) {
      return 'option3';
    } else if(option1 > option3 && option1 === option2) {
      return 'option1&2';
    } else if(option1 > option2 && option1 === option3) {
      return 'option1&3';
    } else if(option2 > option1 && option2 === option3) {
      return 'option2&3';
    } else {
      return "noconsensus"
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
    } else {
      return "";
    }
  }
}

export default Phase2;