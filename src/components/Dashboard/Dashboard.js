import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import LanguageContext from '../../contexts/LanguageContext';
import dashboardApiService from '../../services/dashboard-api-service';

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
    return (
      <React.Fragment>
        <UserContext.Consumer>
          {value => {
            return (
              <div>
                <h2>{value.user.name}'s Dashboard</h2>
              </div>
            );
          }}
        </UserContext.Consumer>
        {this.context.language.name}
      </React.Fragment>
    );
  }
}

export default Dashboard;
