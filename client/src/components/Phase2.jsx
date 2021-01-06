import {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Header from './children/Header';
import Loading from './children/Loading';
import Waiting from './children/Waiting';
import Choices from './children/Choices';

class Phase2 extends Component {
  state = {
    phaseData: [],
    hiddenPhaseData: [],
    option1: 0,
    option2: 0,
    option3: 0,
    pageLoad: false,
  }

  componentDidMount() {
    this.getPhase2Data(this.props.match.params.parentID);
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
        pageLoad: true
      });
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
    const {user, planCode, name} = this.props.match.params;
    const {phaseData, pageLoad} = this.state;

    
    if(phaseData[0]) {
      return(
        <Choices phaseData={phaseData} choiceMade={this.choiceMade}/>
      );
    } else if(pageLoad === false) {
      return(
        <Loading/>
      );
    } else {
      const topChoice = this.checkConsensus();
      if(topChoice === 'noConsensus') {
        return(
          <div>
            <Header/>

            <section className='main choices'>
              <div className='main__wrapper'>
                <h1 className='title choices__title'>no consensus reached</h1>

                <button className='button choices__button' onClick={() => this.getPhase2Data()}>retry</button>
                <button className='button choices__button' onClick={() => this.pickRandom()}>pick random</button>
              </div>
            </section>
          </div>
        );
      } else if(topChoice.length === 1) {
        return(
          <Redirect to={`/results/${topChoice[0].id}/${user}/${planCode}/${name}`}/>
        );
      } else if(topChoice.length === 2) {
        return(
          <div>
            <Header/>

            <section className='main choices'>
              <div className='main__wrapper'>
                <h1 className='title choices__title'>{`the most popular choices are ${topChoice[0].name} and ${topChoice[1].name}`}</h1>
                
                <button className='button choices__button' onClick={() => this.getPhase2Data()}>retry</button>
                <button className='button choices__button' onClick={() => this.pickRandom()}>pick random</button>
                <button className='button choices__button' onClick={() => this.retryPhaseWithTwo(topChoice)}>retry with top choices</button>
              </div>
            </section>
          </div>
        );
      }
    }
  }
}

export default Phase2;