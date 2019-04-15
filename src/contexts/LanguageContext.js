import React, { Component } from 'react';

const LanguageContext = React.createContext({
  language: {},
  words: [],
  processLanguage: () => {},
  setError: () => {},
  clearError: () => {}
});

export default LanguageContext;

export class LanguageProvider extends Component {
  constructor(props) {
    super(props);
    const state = { language: {}, words: [] };
    this.state = state;
  }

  componentDidMount() {}

  componentWillUnmount() {}

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  processLanguage = language => {
    this.setState({ language: language.language, words: language.words });
  };

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      processLanguage: this.processLanguage,
      processLogout: this.processLogout
    };
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
