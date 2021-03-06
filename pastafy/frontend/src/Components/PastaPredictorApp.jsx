import ResultsHolder from './ResultsHolder';
import { Card, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MultiSelect from "@khanacademy/react-multi-select";

function reFormatIngredients (arrayIngredient) {
    let returnArray = [];
    for (let ingredient of arrayIngredient) {
        returnArray.push({
            value: ingredient,
            label: ingredient,
        })
    }
    return returnArray;
}


export default class PastaPredictorApp extends Component {

    
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      randomness: 0,
      extra_ingredients: 0,
      selected: [],
    };
    this.fetchSelections = this.fetchSelections.bind(this);
    this.handleRandomnessChange = this.handleRandomnessChange.bind(this);
    this.handleExtraIngredientsChange = this.handleExtraIngredientsChange.bind(this);
    this.availableIngredients = ["salmon", "parmesan", "pepper", "basil", "sausage", "sage"];
    this.options = reFormatIngredients(this.availableIngredients);
  }

  fetchSelections = async () => {
    const BASE_URL = 'https://api.pastafy.app/api/prediction';
    const res = await fetch(BASE_URL,         
        {
            method: 'POST',
            body: JSON.stringify({selected: this.state.selected, randomness: this.state.randomness, extra: this.state.extra_ingredients}),
            headers: {
                'Content-Type': 'application/json'
        }
    }); 
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
        const {selected} = this.state;
        return (

            <div className="card w-100">
                <div className="card-body">
                    <h2 class="card-title ">Pasta Predictor V1</h2>
                    <p class="card-text">Input ingredients you have on hand and we will
                    predict the best pasta types. Optionally we will show you 
                    other ingredients that pair well with your input.</p>
                </div>
                <div className="card-body m2">
                    <p class="card-text"><b>Step 1:</b> Select your ingredients below</p>
                    <div className="card">
                        <div className="card-body m2">
                            <MultiSelect
                              options={this.options}
                              selected={selected}
                              onSelectedChanged={selected => this.setState({selected})}
                              hasSelectAll={false}
                            />
                        </div>
                    </div>  
                </div>
                <div className="card-body m2">
                    <p class="card-text"><b>Step 2:</b> Fine tune the settings</p>
                    <div class="card">
                        <div class="card-body">
                            <div className="container">
                                <div className="row border-bottom">
                                    <div className="col">
                                        <label className="mr-5">Randomness</label>
                                    </div>
                                    <div className="col">
                                        <label className="mr-2">Scale: 0-10</label>
                                        <input className="w-75" type="range" min="0" max="10" value={this.state.randomness} onChange={this.handleRandomnessChange}/>
                                    </div>
                                    <div className="col">
                                        <span  className="bg-primary p-2 font-weight-bold text-white rounded-circle">
                                            {this.state.randomness}
                                        </span>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="mr-5">Extra Ingredients</label>
                                    </div>
                                    <div className="col">
                                            <label className="mr-2" >Scale: 0-10</label>
                                            <input className="w-75" type="range" min="0" max="10" value={this.state.extra_ingredients} onChange={this.handleExtraIngredientsChange}/>
                                    </div>
                                    <div className="col">
                                        <span  className="bg-primary p-2 font-weight-bold text-white rounded-circle">
                                            {this.state.extra_ingredients}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Button
                        onClick={this.fetchSelections}>Predict my pasta!</Button>
                    </div>

                </div>  
                <div className="card-body">
                    <h4 class="card-title ">Results</h4>
                    <ResultsHolder tableProps={this.state.result}/>
                </div>  
                            
             
            </div>
        );

    }
}

PastaPredictorApp.propTypes = {
    tableProps: PropTypes.object.isRequired
}