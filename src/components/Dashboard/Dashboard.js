import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
//import LanguageContext from '../../contexts/LanguageContext';
import dashboardApiService from '../../services/dashboard-api-service';

class Dashboard extends Component {
  state = {
    error: null,
    language: null
  };

  //static contextType = userContext;

  componentDidMount() {
    dashboardApiService
      .getLanguage()
      .then(data => {
        console.log(data);
        this.setState({ language: data.language, word: data.words });
      })
      .catch(res => this.setState({ error: res.error }));
  }

  render() {
    return (
      <UserContext.Consumer>
        {value => {
          return (
            <div>
              <h2>{value.user.name}'s Dashboard</h2>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default Dashboard;
