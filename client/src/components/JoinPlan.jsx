import {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Header from './children/Header';

class JoinPlan extends Component {
  state = {
    panCode: '',
    name: ''
  }

  joinPlan = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const planCode = event.target.room.value;
    this.setState({
      planCode: planCode,
      name: name
    });
  }

  render() {
    if(this.state.planCode) {
      return <Redirect to={`/lobby/${this.state.planCode}/${this.state.name}`}/>
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