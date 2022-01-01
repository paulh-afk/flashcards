import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props, obj) {
    super(props);
    this.state = {
      cards: [],
      loaded: false,
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5500/')
      .then((res) => res.data)
      .then((cards) => {
        const c = JSON.parse(cards);
        this.updateCard(c);
      })
      .catch((err) => console.log(err));
  }

  updateCard = (cards) => {
    this.setState({
      cards,
      loaded: true,
    });
  };

  addCard = () => {
    const titre = document.querySelector('input[name="titre"]').value;
    const contenu = document.querySelector('textarea[name="contenu"]').value;

    axios.post('http://localhost:5500/new', {
      titre,
      contenu,
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.loaded
          ? this.state.cards.map((card) => {
              return (
                <>
                  <h3>Titre : {card.titre}</h3>
                  <p>Contenu : {card.contenu}</p>
                </>
              );
            })
          : ''}
        <div>
          <div>
            <label>Titre</label>
            <input type="text" name="titre" />
          </div>
          <div>
            <label>Contenu</label>
            <textarea name="contenu" cols="30" rows="10"></textarea>
          </div>
          <button onClick={this.addCard}>Envoyer</button>
        </div>
      </div>
    );
  }
}

export default App;
