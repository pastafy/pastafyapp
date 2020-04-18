import { Card, Button, Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { user_selections, pasta, extra_ingredients } = this.props.tableProps;
        user_selections = user_selections || [];
        extra_ingredients = extra_ingredients || [];
        return (
            <div className="col-md-6">
                <h3>Prediction:</h3>
                <Jumbotron>
                    <Card style={{ width: '40rem' }}>
                        <Card.Body>
                            <Card.Text>
                                User Selections: <b>{user_selections.map(selection => (selection.charAt(0).toUpperCase()) + selection.slice(1)).join(', ')}</b>
                            </Card.Text>
                            <Card.Text>Pasta: <b>{pasta}</b></Card.Text>
                            <Card.Text>
                                Other Ingredients: <b>{extra_ingredients.map(selection => (selection.charAt(0).toUpperCase()) + selection.slice(1)).join(', ')}</b>
                            </Card.Text>
                            <Button onClick={this.props.selectBtnMgr}>Next Prediction</Button>
                        </Card.Body>
                    </Card>
                </Jumbotron>
            </div>
        );

    }
}

Homepage.propTypes = {
    tableProps: PropTypes.object.isRequired,
    selectBtnMgr: PropTypes.func.isRequired
}