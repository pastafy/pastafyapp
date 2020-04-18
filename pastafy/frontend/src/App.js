import React, { Component } from 'react';
import Homepage from './Components/Homepage';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Forms from './Components/Forms'

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
        <Header />
        <Forms />
        <Homepage tableProps={ this.state.result }
                  selectBtnMgr={this.fetchSelections}
        />
        <Footer />
      </div>  
    );
  }
}

export default App;
