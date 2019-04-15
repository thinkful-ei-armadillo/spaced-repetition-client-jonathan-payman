import React, { Component } from 'react';
import userContext from '../../contexts/UserContext';

class Dashboard extends Component { 
  static contextType = userContext;

  render() {
    const { user } = this.context;
    console.log(this.context);

    return (
      <div>
        <h2>{ user.name }'s Dashboard</h2>

      </div>
    );
  }

}

export default Dashboard;