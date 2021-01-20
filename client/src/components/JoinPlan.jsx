import {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {io} from 'socket.io-client';
import Header from './children//elements/Header';
const BACKEND_URL = process.env.NODE_ENV === "production"
? 'https://downforsomething.herokuapp.com' : process.env.REACT_APP_BACKEND_URL;

class JoinPlan extends Component {
  state = {
    planCode: '',
    name: '',
    nameErrorMsg: '',
    planErrorMsg: ''
  }

  joinPlan = event => {
    event.preventDefault();
    const name = event.target.name.value;

    if(name.trim()) {
      const planCode = event.target.room.value;

      axios.get(`${BACKEND_URL}/plans/${planCode}`)
      .then((result) => {
        if(result.data.roomOpen) {
          const socket = io(`${BACKEND_URL}`);
  
          socket.emit('joinRoom', {
            planCode: planCode,
          });
  
          socket.emit('joinPlan', {
            planCode: planCode,
            name: name
          });
          
          socket.on('joinPlan', () => {
            this.setState({
              planCode: planCode,
              name: name
            });
          });
        } else {
          this.setState({
            planErrorMsg: 'this plan does not exist or has already started. please try with a different code'
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
    } else {
      this.setState({
        nameErrorMsg: 'please enter a name'
      });
    }
  }

  render() {
    const {planCode, name, nameErrorMsg, planErrorMsg} = this.state;

    if(planCode) {
      return <Redirect to={`/lobby/${planCode}/${name}`}/>
    } else {
      return(
        <div>
          <Header/>
          <section className='main create-join'>
            <div className='main__wrapper'>
              <h1 className='title'>join a plan</h1>

              <form className='create-join__form' action='submit' onSubmit={this.joinPlan}>
                <label className='text' htmlFor='name'>name:</label>
                <div>
                  <input className='input create-join__input' type='text' name='name'/>
                  <p className='text'>{nameErrorMsg}</p>
                </div>
                
                <label className='text' htmlFor='name'>plan code:</label>
                <div>
                  <input className='input create-join__input' type='text' name='room'/>
                  <p className='text'>{planErrorMsg}</p>
                </div>

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