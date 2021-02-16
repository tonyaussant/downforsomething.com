import {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {io} from 'socket.io-client';
import randomize from 'randomatic';
import Header from './children/elements/Header';
const BACKEND_URL = process.env.NODE_ENV === "production"
? 'https://downforsomething.herokuapp.com' : process.env.REACT_APP_BACKEND_URL;

class CreatePlan extends Component {
  state = {
    planCode: '',
    name: '',
    errorMsg: ''
  }

  createPlan = event => {
    event.preventDefault();
    const name = event.target.name.value;
    if(name.trim()) {
      const planCode = randomize('aA0', 6);
      const socket = io(`${BACKEND_URL}`);

      socket.emit('joinRoom', {
        planCode: planCode,
      });

      socket.emit('createPlan', {
        planCode: planCode,
        name: name
      });
      
      socket.on('createPlan', () => {
        this.setState({
          planCode: planCode,
          name: name
        });
      });
    } else {
      this.setState({
        errorMsg: 'please enter a name '
      });
    }
  }

  render() {
    const {planCode, name, errorMsg} = this.state;

    if(planCode) {
      return <Redirect to={`/lobby/${planCode}/${name}`}/>
    } else {
      return(
        <div>
          <Header/>
          <section className='main create-join'>
            <div className='main__wrapper'>
              <h1 className='title'>create a plan</h1>

              <form className='create-join__form' action='submit' onSubmit={this.createPlan}>
                <label className='text' htmlFor='name'>display name:</label>
                <div className='create-join__input-box'>
                  <input className='input create-join__input' type='text' name='name'/>
                  <p className='text create-join__error'>{errorMsg}</p>
                </div>
                


                <input className='button create-join__button' type='submit' value='create plan'/>
              </form>
            </div>
          </section>
        </div>
      );
    }
  }
}

export default CreatePlan;