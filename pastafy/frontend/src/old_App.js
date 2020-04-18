import React, { Component } from 'react';

class App extends Component {
  state = {
    ingredients: []
  };
  
  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/'); // fetching the data from api, before the page loaded
      const ingredients = await res.json();
      this.setState({
        ingredients
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {this.state.ingredients.map(item => (
          <div key={item.id}>
            <h3>{item.ingredient}</h3>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;