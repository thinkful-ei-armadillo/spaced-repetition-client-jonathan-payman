import React, { Component } from 'react';
import userContext from '../../contexts/UserContext';
import dashboardApiService from '../../services/dashboard-api-service';

class Dashboard extends Component {
  state = {
    error: null,
    language: null
  };

  static contextType = userContext;

  componentDidMount() {
    dashboardApiService
      .getLanguage()
      .then(lang => {
        debugger;
        console.log(lang);
        this.setState({ language: lang });
      })
      .catch(res => this.setState({ error: res.error }));
  }

  render() {
    const { user } = this.context;

    return (
      <div>
        <h2>{user.name}'s Dashboard</h2>
      </div>
    );
  }
}

export default Dashboard;
