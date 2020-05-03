import React, { Component } from 'react';
import About from './Components/About';
import Header from './Components/Header';

import PastaPredictorApp from './Components/PastaPredictorApp';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: {},
    };
    this.fetchSelections = this.fetchSelections.bind(this);
  }

  fetchSelections = async () => {
    const BASE_URL = 'https://api.pastafy.app/api/prediction';
    const res = await fetch(BASE_URL); 
    const result = await res.json();
    this.setState({result}); 
  };
  
  async componentDidMount() {
      this.fetchSelections();
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container mt-4">
          <div className="row">
            <About/>
          </div>
          <div className="row mt-4">
            <PastaPredictorApp tableProps={ this.state.result }
                    selectBtnMgr={this.fetchSelections}/>
          </div>
        </div>  
      </div>
    );
  }
}

export default App;
