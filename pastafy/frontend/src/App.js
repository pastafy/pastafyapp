import React, { Component } from 'react';
import About from './Components/About';
import Header from './Components/Header';

import PastaPredictorApp from './Components/PastaPredictorApp';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {

  constructor(props) {
    super(props);
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
            <PastaPredictorApp />
          </div>
        </div>  
      </div>
    );
  }
}

export default App;
