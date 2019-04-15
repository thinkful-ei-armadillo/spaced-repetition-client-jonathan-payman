import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import LanguageContext from '../../contexts/LanguageContext';
import dashboardApiService from '../../services/dashboard-api-service';
import WordList from '../WordList/WordList';
import WordListResults from '../WordList/WordList';

class Dashboard extends Component {
  state = {
    error: null,
    language: null
  };

  static contextType = LanguageContext;

  componentDidMount() {
    dashboardApiService
      .getLanguage()
      .then(language => {
        
        // call setState method in Lang context here
        this.context.setLanguage(language);
      })
      .catch(res => this.setState({ error: res.error }));
  }

  render() {
    return (
      <LanguageContext.Consumer>
        { language => (
          <UserContext.Consumer>
            { value => {
              return (
                <div>
                  <h2>{ value.user.name }'s Dashboard</h2>
                  <h3>{ language }</h3>
                  <h4>Words</h4>
                  <ul>
                    <WordList />
                  </ul>
                  <ul>
                    <WordListResults />
                  </ul>
                </div>
              );
            } }
          </UserContext.Consumer>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default Dashboard;
