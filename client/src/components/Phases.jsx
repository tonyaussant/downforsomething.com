import {Component} from 'react';
import axios from 'axios';
import {io} from 'socket.io-client';
import Phase1 from './children/Phase1';
import Phase2 from './children/Phase2';
import Results from './children/Results';

class Phases extends Component {
  state = {
    phaseData: [],
    hiddenPhaseData: [],
    topChoices: [],
    winnerData: [],
    resultsData: [],
    phase1WinnerID: '',
    phase2WinnerID: '',
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
    const {parentID, planCode} = this.props.match.params;
    const {path} = this.props.match;
    
    if(path === '/phase1/:user/:planCode/:name/') {
      this.getPhase1Data();
    } else if(path === '/phase2/:parentID/:user/:planCode/:name/') {
      this.getPhase1WinnerData(parentID);
    } else {
      this.getPhase2WinnerData(parentID);
    }

    const socket = io('http://localhost:8040');

    socket.emit('joinRoom', {
      planCode: planCode
    });

    socket.on('finishedPhase', () => {
      this.getPlanData();
    });

    socket.on('retryPhase', () => {
      if(path === '/phase1/:user/:planCode/:name/') {
        this.getPhase1Data();
      } else {
        this.getPhase1WinnerData(parentID);
      }
    });

    socket.on('retryWithTwo', () => {
      this.resetPhaseData(this.state.topChoices, 1);
    });

    socket.on('nextPhase', (winnerID) => {
      this.setState({
        phase1WinnerID: winnerID,
        pageLoaded: false
      }, () => {
        this.getPhase1WinnerData(winnerID);
      });
    });

    socket.on('getResults', (winnerID) => {
      this.setState({
        phase2WinnerID: winnerID,
        pageLoaded: false
      }, () => {
        this.getPhase2WinnerData(winnerID);
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

  getPhase1WinnerData(winnerID) {
    axios.get(`http://localhost:8080/phase1/${winnerID}`)
    .then((result) => {
      this.setState({
        winnerData: result.data
      }, () => {
        this.getPhase2Data(winnerID);
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getPhase2WinnerData(winnerID) {
    axios.get(`http://localhost:8080/phase2/${winnerID}`)
    .then((result) => {
      this.setState({
        winnerData: result.data
      }, () => {
        this.getResultsData(winnerID);
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }2

  getPhase2Data = (parentID) => {
    axios.get(`http://localhost:8080/phase1/${parentID}/phase2`)
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
        choicesTotal: 0,
      }, () => {
        this.getPlanData();
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getResultsData(parentID) {
    axios.get(`http://localhost:8080/phase2/${parentID}/results`)
    .then((result) => {
      this.setState({
        resultsData: result.data,
        pageLoaded: true
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
    this.setState({
      pageLoaded: false
    }, () => {
      socket.emit('nextPhase', {
        planCode: this.props.match.params.planCode,
        winnerID: winnerID
      });
    })
  }

  getResults = (winnerID) => {
    const socket = io('http://localhost:8040');
    socket.emit('getResults', {
      planCode: this.props.match.params.planCode,
      winnerID: winnerID
    });
  }

  checkConsensus = (optionData) => {
    const option1 = this.state.option1Total;
    const option2 = this.state.option2Total;
    const option3 = this.state.option3Total;
    const {path} = this.props.match;
    const phase1Path = '/phase1/:user/:planCode/:name/'

    if(option1 > option2 && option1 > option3) {
      const option1Data = optionData.filter(choice => choice.option === 1);
      if(path === phase1Path) {
        this.startNextPhase(option1Data[0].id);
      } else {
        this.getResults(option1Data[0].id);
      }

    } else if(option2 > option1 && option2 > option3) {
      const option2Data = optionData.filter(choice => choice.option === 2);
      if(path === phase1Path) {
        this.startNextPhase(option2Data[0].id);
      } else {
        this.getResults(option2Data[0].id);
      }

    } else if(option3 > option1 && option3 > option2) {
      const option3Data = optionData.filter(choice => choice.option === 3);
      if(path === phase1Path) {
        this.startNextPhase(option3Data[0].id);
      } else {
        this.getResults(option3Data[0].id);
      }

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
    const {hiddenPhaseData, phaseData} = this.state;

    if(randomNumber <= 0.3333) {
      this.setState({
        option1Total: 1,
        option2Total: 0,
        option3Total: 0
      }, () => {
        if(hiddenPhaseData[0]) {
          this.checkConsensus(hiddenPhaseData);
        } else {
          this.checkConsensus(phaseData);
        }
      });
    } else if(randomNumber <= 0.6666) {
      this.setState({
        option1Total: 0,
        option2Total: 1,
        option3Total: 0
      }, () => {
        if(hiddenPhaseData[0]) {
          this.checkConsensus(hiddenPhaseData);
        } else {
          this.checkConsensus(phaseData);
        }
      });
    } else {
      this.setState({
        option1Total: 0,
        option2Total: 0,
        option3Total: 1
      }, () => {
        if(hiddenPhaseData[0]) {
          this.checkConsensus(hiddenPhaseData);
        } else {
          this.checkConsensus(phaseData);
        }
      });
    }
  }

  render() {
    const {path} = this.props.match;

    const functions = {
      loadPage: this.loadPage, 
      retryPhase: this.retryPhase,
      retryWithTwo: this.retryWithTwo,
      pickRandom: this.pickRandom, 
      choiceMade: this.choiceMade
    }

    if(path === '/phase1/:user/:planCode/:name/') {
      return(
        <Phase1 params={this.props.match.params} state={this.state} functions={functions}/>
      );
    } else if(path === '/phase2/:parentID/:user/:planCode/:name/') {
      return(
        <Phase2 params={this.props.match.params} state={this.state} functions={functions}/>
      );
    } else {
      return(
        <Results state={this.state}/>
      );
    }
  }
}

export default Phases;