import React from 'react';

import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Jumbotron, Glyphicon } from 'react-bootstrap';

class Forms extends React.Component {
    render() {
        return (
            <div className="col-md-6">
                <Form style={{ width: '18rem' }}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Ingredient:</Form.Label>
                    <Form.Control type="ingredients" placeholder="Enter Ingredient" />
                </Form.Group>
                <Button href="#">Add Ingredient</Button>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Selected ingredients</Form.Label>
                    <Form.Control as="select" multiple>
                    <option>Sausage</option>
                    <option>Sage</option>
                    </Form.Control>
                </Form.Group>
                </Form>
            </div>
        );
    }
}


export default Forms;