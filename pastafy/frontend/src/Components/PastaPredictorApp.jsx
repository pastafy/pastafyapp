import ResultsHolder from './ResultsHolder';
import { Card, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class PastaPredictorApp extends Component {

    
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      randomness: 0,
      extra_ingredients: 0,
    };
    this.fetchSelections = this.fetchSelections.bind(this);
    this.handleRandomnessChange = this.handleRandomnessChange.bind(this);
    this.handleExtraIngredientsChange = this.handleExtraIngredientsChange.bind(this);

  }

  fetchSelections = async () => {
    const BASE_URL = 'https://api.pastafy.app/api/prediction';
    const res = await fetch(BASE_URL); 
    const result = await res.json();
    this.setState({result}); 
  };
  
  handleRandomnessChange(event) {
      this.setState({randomness: event.target.value});
  }
  
    handleExtraIngredientsChange(event) {
      this.setState({extra_ingredients: event.target.value});
    }
  
  async componentDidMount() {
      this.fetchSelections();
  }

    render() {

        return (

            <div className="card w-100">
                <div className="card-body">
                    <h2 class="card-title ">Pasta Predictor V1</h2>
                    <p class="card-text">Input ingredients you have on hand and we will
                    predict the best pasta types. Optionally we will show you 
                    other ingredients that pair well with your input.</p>
                </div>
                <div className="card-body">
                    <p class="card-text"><b>Step 1:</b>Select your ingredients below</p>
                    <p>TODO: add input field with ingredients, input will have dropdown that matches current input
                    undeneath will be a container with already selected ingredients, clicking on them will remove 
                    them from the current selection</p>
                </div>  
                <div className="card-body">
                    <p class="card-text"><b>Step 2:</b> Fine tune the settings</p>
                    <div className="container">
                        <div className="row border-bottom">
                            <div className="col">
                                <label className="mr-5">Randomness</label>
                            </div>
                            <div className="col w-100">
                                <label className="mr-2">0</label>
                                <input type="range" min="0" max="10" value={this.state.randomness} onChange={this.handleRandomnessChange}/>
                                <label className="ml-2">10</label>
                            </div>
                            <div className="col">
                                {this.state.randomness}
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="mr-5">Extra Ingredients</label>
                            </div>
                            <div className="col w-100">
                                <label className="mr-2">0</label>
                                <input type="range" min="0" max="10" value={this.state.extra_ingredients} onChange={this.handleExtraIngredientsChange}/>
                                <label className="ml-2">10</label>
                            </div>
                            <div className="col">
                                {this.state.extra_ingredients}
                            </div>
                        </div>
                        <div className="row mt-3">
                            <Button>Predict my pasta!</Button>
                        </div>
                    </div>
                </div>  
                <div className="card-body">
                    <h4 class="card-title ">Results</h4>
                    <ResultsHolder tableProps={{}}/>
                </div>  
                            
             
            </div>
        );

    }
}

PastaPredictorApp.propTypes = {
    tableProps: PropTypes.object.isRequired,
    selectBtnMgr: PropTypes.func.isRequired
}