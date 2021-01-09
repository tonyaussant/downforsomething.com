import {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {io} from 'socket.io-client';
import Waiting from './children/Waiting';
import PrePhase from './children/PrePhase';
import Options from './children/Options';
import TieBreaker from './children/TieBreaker';

class Phase1 extends Component {
  state = {
    phaseData: [],
    hiddenPhaseData: [],
    topChoices: [],
    winnerID: '',
    option1: 0,
    option2: 0,
    option3: 0,
    option1Total: 0,
    option2Total: 0,
    option3Total: 0,
    choicesMade: 0,
    choicesTotal: 0,
    choicesNeeded: 99,
    pageLoaded: false
  }

  componentDidMount() {
    this.getPhase1Data();
    const socket = io('http://localhost:8040');

    socket.emit('joinRoom', {
      planCode: this.props.match.params.planCode
    });

    socket.on('finishedPhase', () => {
      this.getPlanData();
    });

    socket.on('retryPhase', () => {
      this.getPhase1Data();
    });

    socket.on('retryWithTwo', () => {
      this.resetPhaseData(this.state.topChoices, 1);
    });

    socket.on('nextPhase', (winnerID) => {
      this.setState({
        winnerID: winnerID
      });
    });
  }

  getPhase1Data = () => {
    axios.get('http://localhost:8080/phase1')
    .then((result) => {
      this.setState({
        phaseData: result.data,
        hiddenPhaseData: [],
        topChoices: [],
        option1: 0,
        option2: 0,
        option3: 0,
        option1Total: 0,
        option2Total: 0,
        option3Total: 0,
        choicesMade: 0,
        choicesTotal: 0
      }, () => {
        this.getPlanData();
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getPlanData = () => {
    axios.get(`http://localhost:8080/plans/${this.props.match.params.planCode}`)
    .then((result) => {
      this.setState({
        option1Total: result.data.option1Total,
        option2Total: result.data.option2Total,
        option3Total: result.data.option3Total,
        choicesTotal: result.data.choicesTotal,
        choicesNeeded: result.data.choicesNeeded
      }, () => {
        if(this.state.choicesTotal === this.state.choicesNeeded) {
          if(this.state.hiddenPhaseData[0]) {
            this.checkConsensus(this.state.hiddenPhaseData);
          } else {
            this.checkConsensus(this.state.phaseData);
          }
        }
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  loadPage = () => {
    this.setState({
      pageLoaded: true
    })
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
        hiddenPhaseData: hiddenPhaseDataUpdate,
        [optionPicked]: this.state[optionPicked] + 1,
        choicesMade: this.state.choicesMade + 1
      }, () => {
        if(this.state.choicesMade === 3) {
          this.finishedPhase();
        }
      });
    } else {
      this.setState({
        phaseData: phaseDataUpdate,
        hiddenPhaseData: hiddenPhaseDataUpdate,
        choicesMade: this.state.choicesMade + 1
      }, () => {
        if(this.state.choicesMade === 3) {
          this.finishedPhase();
        }
      });
    }
  }

  finishedPhase = () => {
    const socket = io('http://localhost:8040');

    socket.emit('finishedPhase', {
      planCode: this.props.match.params.planCode,
      option1: this.state.option1,
      option2: this.state.option2,
      option3: this.state.option3,
      choicesMade: this.state.choicesMade
    });
  }

  resetPlanData = () => {
    const socket = io('http://localhost:8040');

    socket.emit('resetPlan', {
      planCode: this.props.match.params.planCode
    });
  }

  resetPhaseData = (choiceData, choicesMade) => {
    this.setState({
      phaseData: choiceData,
      hiddenPhaseData: [],
      topChoices: [],
      option1: 0,
      option2: 0,
      option3: 0,
      option1Total: 0,
      option2Total: 0,
      option3Total: 0,
      choicesMade: choicesMade,
      choicesTotal: 0
    });
  }

  startNextPhase = (winnerID) => {
    const socket = io('http://localhost:8040');
    socket.emit('nextPhase', {
      planCode: this.props.match.params.planCode,
      winnerID: winnerID
    });
  }

  checkConsensus = (optionData) => {
    const option1 = this.state.option1Total;
    const option2 = this.state.option2Total;
    const option3 = this.state.option3Total;

    if(option1 > option2 && option1 > option3) {
      const option1Data = optionData.filter(choice => choice.option === 1);
      this.startNextPhase(option1Data[0].id);

    } else if(option2 > option1 && option2 > option3) {
      const option2Data = optionData.filter(choice => choice.option === 2);
      this.startNextPhase(option2Data[0].id);

    } else if(option3 > option1 && option3 > option2) {
      const option3Data = optionData.filter(choice => choice.option === 3);
      this.startNextPhase(option3Data[0].id);

    } else if(option1 > option3 && option1 === option2) {
      const options1And2Data = optionData.filter(choice => choice.option === 1 || choice.option === 2);
      this.setState({
        topChoices: options1And2Data
      });

    } else if(option1 > option2 && option1 === option3) {
      const options1And3Data = optionData.filter(choice => choice.option === 1 || choice.option === 3);
      this.setState({
        topChoices: options1And3Data
      });

    } else if(option2 > option1 && option2 === option3) {
      const options2And3Data = optionData.filter(choice => choice.option === 2 || choice.option === 3);
      this.setState({
        topChoices: options2And3Data
      });

    } else {
      this.setState({
        topChoices: optionData
      });
    }
  }

  retryPhase = () => {
    const socket = io('http://localhost:8040');

    socket.emit('retryPhase', {
      planCode: this.props.match.params.planCode
    });
  }

  retryWithTwo = () => {
    const socket = io('http://localhost:8040');

    socket.emit('retryWithTwo', {
      planCode: this.props.match.params.planCode
    });
  }

  pickRandom = () => {
    const randomNumber = Math.random();
    const {hiddenPhaseData} = this.state;

    if(randomNumber <= 0.3333) {
      this.setState({
        option1Total: 1,
        option2Total: 0,
        option3Total: 0
      }, () => {
        this.checkConsensus(hiddenPhaseData);
      });
    } else if(randomNumber <= 0.6666) {
      this.setState({
        option1Total: 0,
        option2Total: 1,
        option3Total: 0
      }, () => {
        this.checkConsensus(hiddenPhaseData);
      });
    } else {
      this.setState({
        option1Total: 0,
        option2Total: 0,
        option3Total: 1
      }, () => {
        this.checkConsensus(hiddenPhaseData);
      });
    }
  }

  render() {
    const {user, planCode, name} = this.props.match.params;
    const {phaseData, topChoices, pageLoaded, winnerID} = this.state;

    if(!pageLoaded) {
      return(
        <PrePhase displayName={name} loadPage={this.loadPage}/>
      );
    } else if(winnerID) {
      return(
        <Redirect to={`/phase2/${winnerID}/${user}/${planCode}/${name}`}/>
      );
    } else if(topChoices[0]) {
      return(
        <TieBreaker user={user} topChoices={topChoices} retryPhase={this.retryPhase} retryWithTwo={this.retryWithTwo} pickRandom={this.pickRandom}/>
      );
    } else if(phaseData[0]) {
      return(
        <Options phaseData={phaseData} choiceMade={this.choiceMade}/>
      );
    } else {
      return(
        <Waiting/>
      );
    }
  }
}

export default Phase1;