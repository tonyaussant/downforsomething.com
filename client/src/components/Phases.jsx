import {Component} from 'react';
import axios from 'axios';
import {io} from 'socket.io-client';
import {consensusChecker} from '../functions/functions';
import Phase1 from './children/Phase1';
import Phase2 from './children/Phase2';
import Results from './children/Results';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class Phases extends Component {
  state = {
    phaseData: [],
    hiddenPhaseData: [],
    topChoices: [],
    phase1WinnerData: [],
    phase2WinnerData: [],
    resultsData: [],
    users: [],
    phase1WinnerID: '',
    phase2WinnerID: '',
    option1: 0,
    option2: 0,
    option3: 0, 
    option4: 0,
    option5: 0,
    option1Total: 0,
    option2Total: 0,
    option3Total: 0,
    option4Total: 0,
    option5Total: 0,
    choicesMade: 0,
    choicesTotal: 0,
    choicesNeeded: 99,
    retry: 0,
    random: 0,
    retryTotal: 0,
    randomTotal: 0,
    tieBreakers: 0,
    tieBreakersTotal: 0,
    tieBreakersNeeded: 99,
    pageLoaded: false
  }

  componentDidMount() {
    const {parentID, planCode} = this.props.match.params;
    let {path} = this.props.match;
    
    if(path === '/phase1/:planCode/:name/') {
      this.getPhase1Data();
    } else if(path === '/phase2/:parentID/:planCode/:name/') {
      this.getPhase1WinnerData(parentID);
    } else {
      this.getPhase2WinnerData(parentID);
    }

    const socket = io(`${BACKEND_URL}`);

    socket.emit('joinRoom', {
      planCode: planCode
    });

    socket.on('finishedPhase', () => {
      this.getUserData();
    });

    socket.on('retryPhase', () => {
      const {parentID} = this.props.match.params;
      let {path} = this.props.match;
      
      if(path === '/phase1/:planCode/:name/') {
        this.getPhase1Data();
      } else {
        this.getPhase2Data(parentID);
      }
    });

    socket.on('pickRandom', () => {
      this.getPlanData();
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
    axios.get(`${BACKEND_URL}/phase1`)
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
        retry: 0,
        random: 0,
        retryTotal: 0,
        randomTotal: 0,
        tieBreakers: 0,
        tieBreakersTotal: 0
      }, () => {
        this.getUserData();
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getPhase1WinnerData(winnerID) {
    axios.get(`${BACKEND_URL}/phase1/${winnerID}`)
    .then((result) => {
      this.setState({
        phase1WinnerData: result.data
      }, () => {
        this.getPhase2Data(winnerID);
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getPhase2WinnerData(winnerID) {
    axios.get(`${BACKEND_URL}/phase2/${winnerID}`)
    .then((result) => {
      this.setState({
        phase2WinnerData: result.data
      }, () => {
        this.getResultsData(winnerID);
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }2

  getPhase2Data = (parentID) => {
    axios.get(`${BACKEND_URL}/phase1/${parentID}/phase2`)
    .then((result) => {
      this.setState({
        phaseData: result.data,
        hiddenPhaseData: [],
        topChoices: [],
        option1: 0,
        option2: 0,
        option3: 0,
        option4: 0,
        option5: 0,
        option1Total: 0,
        option2Total: 0,
        option3Total: 0,
        option4Total: 0,
        option5Total: 0,
        choicesMade: 0,
        choicesTotal: 0,
        retry: 0,
        random: 0,
        retryTotal: 0,
        randomTotal: 0,
        tieBreakers: 0,
        tieBreakersTotal: 0
      }, () => {
        this.getUserData();
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getResultsData(parentID) {
    axios.get(`${BACKEND_URL}/phase2/${parentID}/results`)
    .then((result) => {
      this.setState({
        resultsData: result.data,
        pageLoaded: true
      }, () => {
        this.deletePlanData();
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getUserData = () => {  
    axios.get(`${BACKEND_URL}/plans/${this.props.match.params.planCode}/users`)
    .then((result) => {
      this.setState({
        users: result.data
      }, () => {
        this.getPlanData();
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getPlanData = () => {
    axios.get(`${BACKEND_URL}/plans/${this.props.match.params.planCode}`)
    .then((result) => {
      this.setState({
        option1Total: result.data.option1Total,
        option2Total: result.data.option2Total,
        option3Total: result.data.option3Total,
        option4Total: result.data.option4Total,
        option5Total: result.data.option5Total,
        choicesTotal: result.data.choicesTotal,
        choicesNeeded: result.data.choicesNeeded,
        retryTotal: result.data.retryTotal,
        randomTotal: result.data.randomTotal,
        tieBreakersTotal: result.data.tieBreakersTotal,
        tieBreakersNeeded: result.data.tieBreakersNeeded
      }, () => {
        if(this.state.tieBreakersTotal === this.state.tieBreakersNeeded) {
          this.checkTieBreakerConsensus();
        } else if(this.state.choicesTotal === this.state.choicesNeeded) {
          if(this.state.hiddenPhaseData[0]) {
            this.checkOptionsConsensus(this.state.hiddenPhaseData);
          } else {
            this.checkOptionsConsensus(this.state.phaseData);
          }
        }
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  deletePlanData = () => {
    const socket = io(`${BACKEND_URL}`);

    socket.emit('deletePlan', {
      planCode: this.props.match.params.planCode
    });
  }

  loadPage = () => {
    this.setState({
      pageLoaded: true
    })
  }

  optionPicked = (event, option, index) => {
    const optionPicked = `option${option}`
    const btnPressed = event.target.value;
    const {path} = this.props.match;
    const phase1Path = '/phase1/:planCode/:name/';

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
        if(path === phase1Path && this.state.choicesMade === 3) {
          this.finishedPhase('phase1Done');
        } else if(this.state.choicesMade === 5) {
          this.finishedPhase('phase2Done');
        }
      });
    } else {
      this.setState({
        phaseData: phaseDataUpdate,
        hiddenPhaseData: hiddenPhaseDataUpdate,
        choicesMade: this.state.choicesMade + 1
      }, () => {
        if(path === phase1Path) {
          if(this.state.choicesMade === 3) {
            this.finishedPhase('phase1Done');
          }
        } else {
          if(this.state.choicesMade === 5) {
            this.finishedPhase('phase2Done');
          }
        }
      });
    }
  }

  tieBreakerPicked = (event) => {
    const btnPressed = event.target.value;

    if(btnPressed === 'retry') {
      this.setState({
        retry: 1,
        tieBreakers: 1
      }, () => {
        this.finishedTieBreaker();
      });
    } else {
      this.setState({
        random: 1,
        tieBreakers: 1
      }, () => {
        this.finishedTieBreaker();
      });
    }
  }

  finishedPhase = (phaseDone) => {
    const {planCode, name} = this.props.match.params;
    const socket = io(`${BACKEND_URL}`);
    const specificUser = this.state.users.filter((user) => user.name === name);
    const userID = specificUser[0].id;

    socket.emit('finishedPhase', {
      planCode: planCode,
      userID: userID,
      option1: this.state.option1,
      option2: this.state.option2,
      option3: this.state.option3,
      option4: this.state.option4,
      option5: this.state.option5,
      choicesMade: this.state.choicesMade,
      phaseDone: phaseDone
    });
  }

  finishedTieBreaker = () => {
    const {planCode, name} = this.props.match.params;
    const socket = io(`${BACKEND_URL}`);
    const specificUser = this.state.users.filter((user) => user.name === name);
    const userID = specificUser[0].id;

    socket.emit('finishedTieBreaker', {
      planCode: planCode,
      userID: userID,
      retry: this.state.retry,
      random: this.state.random
    });
  }

  resetPlanData = () => {
    const socket = io(`${BACKEND_URL}`);

    socket.emit('resetPlan', {
      planCode: this.props.match.params.planCode
    });
  }

  startNextPhase = (winnerID) => {
    const socket = io(`${BACKEND_URL}`);
    socket.emit('nextPhase', {
      planCode: this.props.match.params.planCode,
      winnerID: winnerID
    });
  }

  getResults = (winnerID) => {
    const socket = io(`${BACKEND_URL}`);
    socket.emit('getResults', {
      planCode: this.props.match.params.planCode,
      winnerID: winnerID
    });
  }

  restartPhase = (phase) => {
    if(phase === 'phase1') {
      this.getPhase1Data();
    } else {
      this.getPhase2Data(this.props.match.params.parentID)
    }
  }

  checkOptionsConsensus = (optionData) => {
    const option1 = this.state.option1Total;
    const option2 = this.state.option2Total;
    const option3 = this.state.option3Total;
    const option4 = this.state.option4Total;
    const option5 = this.state.option5Total;
    const {path} = this.props.match;

    const winningOptionData = consensusChecker(optionData, option1, option2, option3, option4, option5);
    if(winningOptionData.length === 1) {
      if(path === '/phase1/:planCode/:name/') {
        this.startNextPhase(winningOptionData[0].id);
      } else {
        this.getResults(winningOptionData[0].id);
      }
    } else {
      this.setState({
        topChoices: winningOptionData
      });
    }
  }

  checkTieBreakerConsensus = () => {
    const retry = this.state.retryTotal;
    const random = this.state.randomTotal;

    if(retry >= random) {
      this.retryPhase();
    } else {
      this.pickRandom();
    }
  }

  retryPhase = () => {
    const socket = io(`${BACKEND_URL}`);

    socket.emit('retryPhase', {
      planCode: this.props.match.params.planCode
    });
  }

  pickRandom = () => {
    const {path} = this.props.match;
    const socket = io(`${BACKEND_URL}`);

    if(path === '/phase1/:planCode/:name/') {
      socket.emit('pickRandom', {
        planCode: this.props.match.params.planCode,
        phase: 'phase1'
      });
    } else {
      socket.emit('pickRandom', {
        planCode: this.props.match.params.planCode,
        phase: 'phase2'
      });
    }
  }

  render() {
    const {path} = this.props.match;

    const functions = {
      loadPage: this.loadPage,
      optionPicked: this.optionPicked,
      tieBreakerPicked: this.tieBreakerPicked,
      restartPhase: this.restartPhase
    }

    if(path === '/phase1/:planCode/:name/') {
      return(
        <Phase1 params={this.props.match.params} state={this.state} functions={functions}/>
      );
    } else if(path === '/phase2/:parentID/:planCode/:name/') {
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