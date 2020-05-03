import React, { Component } from 'react';

import { Card, Button } from 'react-bootstrap';

export default class ResultsHolder extends Component {
        
    constructor(props) {
        super(props);
    } 
    render() {
        let { user_selections, pasta, extra_ingredients } = this.props.tableProps;
        user_selections = user_selections || [];
        extra_ingredients = extra_ingredients || [];
        return (
            <div className="card w-100">
                <div className="card-body">   
                    <Card.Text>
                        User Selections: <b>{user_selections.map(selection => (selection.charAt(0).toUpperCase()) + selection.slice(1)).join(', ')}</b>
                    </Card.Text>
                    <Card.Text>
                        Pasta: <b>{pasta}</b>
                    </Card.Text>
                    <Card.Text>
                        Other Ingredients: <b>{extra_ingredients.map(selection => (selection.charAt(0).toUpperCase()) + selection.slice(1)).join(', ')}</b>
                    </Card.Text>
                </div>
            </div>
        );
    }
}