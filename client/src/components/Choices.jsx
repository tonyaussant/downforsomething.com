import {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Header from './children/Header';
import ChoiceCard from './children/ChoiceCard';

class Choices extends Component {
  state = {
    phaseData: [],
    hiddenPhaseData: [],
    option1: 0,
    option2: 0,
    option3: 0,
    pageLoad: false,
    currentPhase: 1
  }

  componentDidMount() {
    this.getPhase1Data();
  }

  getPhase1Data() {
    axios.get(`http://localhost:8080/phase1`)
    .then((result) => {
      this.setState({
        phaseData: result.data,
        hiddenPhaseData: [],
        option1: 0,
        option2: 0,
        option3: 0,
        pageLoad: true
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getPhase2Data(parentID) {
    axios.get(`http://localhost:8080/phase1/${parentID}/phase2`)
    .then((result) => {
      this.setState({
        phaseData: result.data,
        hiddenPhaseData: [],
        option1: 0,
        option2: 0,
        option3: 0,
        pageLoad: true,
        currentPhase: 2
      });
      return <Redirect to='/phase2/:parentID/:roomCode/:displayName'/>
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getWinningOptionData(option) {
    const winningOptionData = this.state.hiddenPhaseData.filter(choice => choice.option === option);
    return winningOptionData;
  }

  getTiedOptionsData(option1, option2) {
    const tiedOptionsData = this.state.hiddenPhaseData.filter(choice => choice.option === option1 || choice.option === option2);
    console.log(tiedOptionsData);
    return tiedOptionsData;
  }

  choiceMade = (event, option, index) => {
    const optionPicked = `option${option}`
    const btnPressed = event.target.value;
    const phaseDataUpdate = this.state.phaseData;
    const hiddenPhaseDataUpdate = this.state.hiddenPhaseData;
    const removedOption = phaseDataUpdate.splice(index, 1);
    hiddenPhaseDataUpdate.push(removedOption[0]);

    if(btnPressed === 'yes') {
      this.setState({
        phaseData: phaseDataUpdate,
        [optionPicked]: this.state[optionPicked] + 1,
        hiddenPhaseData: hiddenPhaseDataUpdate
      });
    } else {
      this.setState({
        phaseData: phaseDataUpdate,
        hiddenPhaseData: hiddenPhaseDataUpdate
      });
    }
  }

  checkConsensus() {
    const option1 = this.state.option1;
    const option2 = this.state.option2;
    const option3 = this.state.option3;

    if(option1 > option2 && option1 > option3) {
      const option1Data = this.getWinningOptionData(1);
      return option1Data;
    } else if(option2 > option1 && option2 > option3) {
      const option2Data = this.getWinningOptionData(2);
      return option2Data;
    } else if(option3 > option1 && option3 > option2) {
      const option3Data = this.getWinningOptionData(3);
      return option3Data;
    } else if(option1 > option3 && option1 === option2) {
      const options1And2Data = this.getTiedOptionsData(1, 2);
      return options1And2Data;
    } else if(option1 > option2 && option1 === option3) {
      const options1And3Data = this.getTiedOptionsData(1, 3);
      return options1And3Data;
    } else if(option2 > option1 && option2 === option3) {
      const options2And3Data = this.getTiedOptionsData(2, 3);
      return options2And3Data;
    } else {
      return "noConsensus"
    }
  }

  getNextPhase(parentID) {
    this.getPhase2Data(parentID);
  }

  retryPhase() {
    this.getPhase1Data();
  }

  retryPhaseWithTwo(topChoices) {
    this.setState({
      phaseData: topChoices,
      hiddenPhaseData: [],
      option1: 0,
      option2: 0,
      option3: 0,
    })
  }

  pickRandom() {
    const randomNumber = Math.random();
    if(randomNumber <= 0.3333) {
      this.setState({
        option1: 1,
        option2: 0,
        option3: 0
      });
    } else if(randomNumber <= 0.6666) {
      this.setState({
        option1: 0,
        option2: 1,
        option3: 0
      });
    } else {
      this.setState({
        option1: 0,
        option2: 0,
        option3: 1
      });
    }
  }

  render() {
    const {phase, roomCode, displayName} = this.props.match.params;

    if(phase === 'phase1' && this.state.currentPhase === 2) {
      return(
        <Redirect to={`/choices/phase2/${this.state.phaseData[0].parentID}/${roomCode}/${displayName}`}/>
      );
    } else if(this.state.phaseData[0]) {
      return(
        <div>
          <Header/>
          {this.state.phaseData.map((choice, index) => <ChoiceCard key={choice.id}  index={index} option={choice.option} name={choice.name} img={choice.img} clickHandler={this.choiceMade}/>)}
        </div>
      );
    } else if(this.state.pageLoad === false) {
      return(
        <h1>Loading</h1>
      );
    } else {
      const topChoice = this.checkConsensus();
      if(topChoice === 'noConsensus') {
        return(
          <div>
            <Header/>
            <h2>No consensus reached</h2>
            <button onClick={() => this.retryPhase()}>Retry</button>
            <button onClick={() => this.pickRandom()}>Pick Random</button>
          </div>
        )
      } else if(topChoice.length === 1) {
        return(
          <div>
            <Header/>
            <h2>{`Most popular choice is ${topChoice[0].name}`}</h2>
            <button onClick={() => this.getNextPhase(topChoice[0].id)}>Continue</button>
          </div>
        );
      } else if(topChoice.length === 2) {
        return(
          <div>
            <Header/>
            <h2>{`Most popular choices are ${topChoice[0].name} and ${topChoice[1].name}`}</h2>
            <button onClick={() => this.retryPhase()}>Retry</button>
            <button onClick={() => this.pickRandom()}>Pick Random</button>
            <button onClick={() => this.retryPhaseWithTwo(topChoice)}>Retry with Top Choices</button>
          </div>
        );
      }
    }
  }
}

export default Choices;