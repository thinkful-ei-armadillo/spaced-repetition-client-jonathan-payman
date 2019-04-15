import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import { LanguageProvider } from '../../contexts/LanguageContext';

class DashboardRoute extends Component {
  render() {
    return (
      <LanguageProvider>
        <section>
          <Dashboard />
        </section>
      </LanguageProvider>
    );
  }
}

export default DashboardRoute;
