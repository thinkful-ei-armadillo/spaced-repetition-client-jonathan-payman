import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import LanguageContext from '../../contexts/LanguageContext';
import dashboardApiService from '../../services/dashboard-api-service';
import { WordListResults, WordList } from '../WordList/WordList';
import Button from '../Button/Button';
import './Dashboard.css';

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
              {/*<h1>{value.user.name}'s Dashboard</h1>*/}
              <h2>{this.context.language.name}</h2>
              <p>Total correct answers: {this.context.language.total_score}</p>

              <section className="list-container">
                <h3>Words to practice</h3>
                <ul className="word-list">
                  {words.map((word, i) => (
                    <WordList key={i} word={word} />
                  ))}
                </ul>
                {/*<ul className="word-results">
                  {words.map((word, i) => (
                    <WordListResults key={i} word={word} />
                  ))}
                </ul>*/}
                <Link to="/learn" className="dashboard-btn">
                  <Button className="dashboard-btn">Start practicing</Button>
                </Link>
              </section>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default Dashboard;
