import React, { Component } from 'react';

class App extends Component{
  constructor(props){
    super(props);

    this.state={
      newItem:"",
      addedItem:null,
      currentList: [],
      error:null,
      isLoaded: false,
      inputBox:""
    }
  }

  componentDidMount() {
    fetch("http://programmingtest-env.psgbbuhp4i.us-east-1.elasticbeanstalk.com/note", {
      headers:{
        Authorization:"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYW4iLCJleHAiOjE1ODE1NTYxNTF9.WsAkieDCqpz5JoNaXKq3_APML_LxX35NtxUmp0TRTDLU7FpL5KgFZIHpLif_mUdu2lUR_SLeHrmEUtcatSwdyA"
      }
      })
      .then(response => {
        if (response !== null){
          console.log(response);
          return response.json() ;
        } else {
          throw new Error('something went wrong...');
        }
      })
      .then(data => {
        console.log("data", data);
        this.setState({
          currentList: data,
          isLoaded: true,
        })
        console.log('this is state', this.state)
      })
      .catch(error => this.setState({ error, isLoading: false }));

  }

  submitNotesData(){
    fetch("http://programmingtest-env.psgbbuhp4i.us-east-1.elasticbeanstalk.com/note", {
      method:'POST',
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        'Authorization':"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYW4iLCJleHAiOjE1ODE1NTYxNTF9.WsAkieDCqpz5JoNaXKq3_APML_LxX35NtxUmp0TRTDLU7FpL5KgFZIHpLif_mUdu2lUR_SLeHrmEUtcatSwdyA"
      }
      })
      .then(response => {
        if (response !== null){
          console.log(response);
          return response.json() ;
        } else {
          throw new Error('something went wrong...');
        }
      })
  }

  updateInput = (input)=> {
    this.setState({ inputBox: input.target.value })
    console.log(this.state.inputBox)
  }

  
  render(){
    const { error, isLoaded } = this.state;
    console.log('this is state')
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading... for ever</div>;
    } else {
      
    return(
      <div className="App">
         Add an Item...
          <br />
          <input
            type="text"
            placeholder="Type memo here"
            // value={this.state.newItem}
            onChange={this.updateInput}
          />
          <button
             className="add-btn btn-floating"
            //  onClick={() => this.addItem()}  WILL USE FOR LATER
          > Click this to receive notes</button>
          <button className="add-btn btn-floating" 
          onClick={ ()=> this.submitNotesData()}> 
          Click to submit notes</button>
        <ul>
          
          {this.state.currentList.map(listItem => 
          <li key={listItem.id}>
            <h1>{listItem.title}</h1>
            <p>{listItem.body}</p>
            </li>)
            }
          </ul>

            
      </div>
    )
    }
  }
}

export default App;
