import React, { Component } from 'react';

const LanguageContext = React.createContext({
  language: {},
  words: [],
  head: null,
  processLanguage: () => {},
  processNextWord: () => {},
  setError: () => {},
  clearError: () => {}
});

export default LanguageContext;

export class LanguageProvider extends Component {
  constructor(props) {
    super(props);
    const state = { language: {}, words: [], head: null };
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

  processNextWord = head => {
    this.setState({ head: head });
  };

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      head: this.state.head,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      processLanguage: this.processLanguage,
      processNextWord: this.processNextWord,
      processLogout: this.processLogout
    };
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
