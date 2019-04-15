import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import LanguageContext from '../../contexts/LanguageContext';
import dashboardApiService from '../../services/dashboard-api-service';
import { WordListResults, WordList } from '../WordList/WordList';
import './Dashboard.css'

class Dashboard extends Component {
  state = {
    error: null,
    language: null
  };

  static contextType = LanguageContext;

  componentDidMount() {
    dashboardApiService
      .getLanguage()
      .then(data => {
        this.context.processLanguage(data);
      })
      .catch(res => this.setState({ error: res.error }));
  }

  render() {
    const { words } = this.context;
    return (
      <UserContext.Consumer>
        {value => {
          return (
            <div>
              <h2>{value.user.name}'s Dashboard</h2>
              <h3>{this.context.language.name}</h3>
              <h4>Words</h4>
              <ul className='word-list'>
                {
                  words.map((word, i) => <WordList key={i} word={word} />)
                }
              </ul>
              <ul className='word-results'>
                {
                  words.map((word, i) => <WordListResults key={i} word={word} />)
                }
              </ul>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default Dashboard;
