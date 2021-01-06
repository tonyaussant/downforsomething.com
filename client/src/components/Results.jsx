import {Component} from 'react';
import axios from 'axios';
import Header from './children/Header';
import Loading from './children/Loading';
import LinkCard from './children/LinkCard';

class Choices extends Component {
  state = {
    winnerData: [],
    winnerLinks: []
  }

  componentDidMount() {
    this.getPhase2DataByID(this.props.match.params.winnerID)
    this.getResultsData(this.props.match.params.winnerID);
  }

  getPhase2DataByID(id) {
    axios.get(`http://localhost:8080/phase2/${id}`)
    .then((result) => {
      this.setState({
        winnerData: result.data
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
        winnerLinks: result.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const {winnerData, winnerLinks} = this.state;

    if(winnerLinks[0]) {
      return(
        <div>
          <Header/>

          <section className='main'>
            <div className='main__wrapper'>
              <h1 className='title'>{`the group has chosen to ${winnerData.name}!`}</h1>

              <img className='gif' src={winnerData.img} alt={winnerData.name}/>

              <h2 className='sub-title'>here are some suggestions to help you have the best time:</h2>

              {winnerLinks.map((link) => 
              <LinkCard key={link.id} name={link.name} url={link.url}/>)}
            </div>
          </section>
        </div>
      );
    } else {
      return(
        <Loading/>
      );
    }
  }
}

export default Choices;