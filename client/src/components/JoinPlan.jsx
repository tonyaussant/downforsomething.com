import {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {io} from 'socket.io-client';
import Header from './children/Header';

class JoinPlan extends Component {
  state = {
    planCode: '',
    name: ''
  }

  checkPlanCode(planCode) {
    axios.get(`http://localhost:8080/plans`)
    .then((result) => {
      const isPlanCode = result.data.filter(plan => plan.code === planCode);
      if(isPlanCode[0]) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  joinPlan = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const planCode = event.target.room.value;

    axios.get(`http://localhost:8080/plans`)
    .then((result) => {
      const isPlanCode = result.data.filter(plan => plan.code === planCode);
      if(isPlanCode) {
        const socket = io('http://localhost:8080');
        socket.emit('joinRoom', {
          planCode: planCode,
        });
        socket.emit('joinPlan', {
          planCode: planCode,
          name: name
        });
        socket.on('userCreated', () => {
          this.setState({
            planCode: planCode,
            name: name
          });
        });
      } else {
        console.log('plan does not exist');
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    if(this.state.planCode) {
      return <Redirect to={`/lobby/secondary/${this.state.planCode}/${this.state.name}`}/>
    } else {
      return(
        <div>
          <Header/>
          <section className='main create-join'>
            <div className='main__wrapper'>
              <h1 className='title'>join a plan</h1>

              <form className='create-join__form' action='submit' onSubmit={this.joinPlan}>
                <label className='text' htmlFor='name'>name:</label>
                <input className='input create-join__input' type='text' name='name'/>
                
                <label className='text' htmlFor='name'>plan code:</label>
                <input className='input create-join__input' type='text' name='room'/>

                <input className='button create-join__button' type='submit' value='join plan'/>
              </form>
            </div>
          </section>
        </div>
      );
    }
  }
}

export default JoinPlan;