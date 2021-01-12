import {Component} from 'react';
import axios from 'axios';
import {io} from 'socket.io-client';
import {randomOptionThree, randomOptionFive, consensusChecker} from '../functions/functions';
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
    const {path} = this.props.match;
    
    if(path === '/phase1/:planCode/:name/') {
      this.getPhase1Data();
    } else if(path === '/phase2/:parentID/:planCode/:name/') {
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
      if(path === '/phase1/:planCode/:name/') {
        this.getPhase1Data();
      } else {
        this.getPhase1WinnerData(parentID);
      }
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
        choicesTotal: 0,
        retryTotal: 0,
        randomTotal: 0,
        tieBreakers: 0,
        tieBreakersTotal: 0
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
        option4: 0,
        option5: 0,
        option1Total: 0,
        option2Total: 0,
        option3Total: 0,
        option4Total: 0,
        option5Total: 0,
        choicesMade: 0,
        choicesTotal: 0,
        tieBreakers: 0,
        tieBreakersTotal: 0
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
      }, () => {
        this.deletePlanData();
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
        option4Total: result.data.option4Total,
        option5Total: result.data.option5Total,
        choicesTotal: result.data.choicesTotal,
        choicesNeeded: result.data.choicesNeeded,
        retryTotal: result.data.retryTotal,
        randomTotal: result.data.randomTotal,
        tieBreakersTotal: result.data.tieBreakersTotal,
        tieBreakersNeeded: result.data.tieBreakersNeeded
      }, () => {
        if(this.state.choicesTotal === this.state.choicesNeeded) {
          if(this.state.hiddenPhaseData[0]) {
            this.checkOptionsConsensus(this.state.hiddenPhaseData);
          } else {
            this.checkOptionsConsensus(this.state.phaseData);
          }
        } else if(this.state.tieBreakersTotal === this.state.tieBreakersNeeded) {
          this.checkTieBreakerConsensus();
        }
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  deletePlanData = () => {
    const socket = io('http://localhost:8040');

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
          this.finishedPhase();
        } else if(this.state.choicesMade === 5) {
          this.finishedPhase();
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
            this.finishedPhase();
          }
        } else {
          if(this.state.choicesMade === 5) {
            this.finishedPhase();
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
        this.finishedPhase();
      });
    } else {
      this.setState({
        random: 1,
        tieBreakers: 1
      }, () => {
        this.finishedPhase();
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
      option4: this.state.option4,
      option5: this.state.option5,
      choicesMade: this.state.choicesMade,
      retry: this.state.retry,
      random: this.state.random,
      tieBreakers: this.state.tieBreakers
    });
  }

  resetPlanData = () => {
    const socket = io('http://localhost:8040');

    socket.emit('resetPlan', {
      planCode: this.props.match.params.planCode
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
    const socket = io('http://localhost:8040');

    socket.emit('retryPhase', {
      planCode: this.props.match.params.planCode
    });
  }

  pickRandom = () => {
    const {hiddenPhaseData, phaseData} = this.state;
    const {path} = this.props.match;

    if(path === '/phase1/:planCode/:name/') {
      const winningOption = randomOptionThree();

      this.setState({
        [winningOption]: 999
      }, () => {
        if(hiddenPhaseData[0]) {
          this.checkOptionsConsensus(hiddenPhaseData);
        } else {
          this.checkOptionsConsensus(phaseData);
        }
      })
    } else {
      const winningOption = randomOptionFive();

      this.setState({
        [winningOption]: 999
      }, () => {
        if(hiddenPhaseData[0]) {
          this.checkOptionsConsensus(hiddenPhaseData);
        } else {
          this.checkOptionsConsensus(phaseData);
        }
      })
    }
  }

  render() {
    const {path} = this.props.match;

    const functions = {
      loadPage: this.loadPage, 
      optionPicked: this.optionPicked,
      tieBreakerPicked: this.tieBreakerPicked
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