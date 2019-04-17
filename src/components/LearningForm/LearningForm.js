import React, { useState, useContext, useEffect, useRef } from 'react';
import { Input, Required, Label } from '../Form/Form';
import Button from '../Button/Button';
import learningApiService from '../../services/learning-api-service';
import LanguageContext from '../../contexts/LanguageContext';
import './LearningForm.css';

export default function LearningForm(props) {
  const languageContext = useContext(LanguageContext);
  const [head, setHead] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [view, setView] = useState('question');
  const [input, setInput] = useState(null);
  const [result, setResult] = useState({});
  const questionInput = useRef(null);

  useEffect(() => {
    learningApiService.getLanguageHead().then(word => {
      console.log(word);
      setHead(word);
      languageContext.processNextWord(word);
    });
  }, []);

  function guessWord(e) {
    e.preventDefault();
    console.log(questionInput.current.value);

    learningApiService.makeGuess(questionInput.current.value).then(response => {
      const newHead = {
        nextWord: response.nextWord,
        totalScore: response.totalScore,
        wordCorrectCount: response.wordCorrectCount,
        wordIncorrectCount: response.wordIncorrectCount
      };
      debugger;
      setResult({ question: head.nextWord, answer: response.answer });
      setInput(questionInput.current.value);
      setCorrect(response.isCorrect);
      setHead(newHead);
      //r//esponse.processNextWord(response.nextWord);
      setView('answer');
    });
    //questionInput.current;
  }

  const showResults = () => {
    return (
      <React.Fragment>
        <div className="DisplayScore">
          <p>Your total score is: {head.totalScore}</p>
        </div>
        <h2>
          {!correct
            ? `Good try, but not quite right :(`
            : `You were correct! :D`}
        </h2>
        <div className="DisplayFeedback">
          <p>
            The correct translation for {result.question} was {result.answer}{' '}
            and you chose {input}!
          </p>
        </div>
        <Button className="result-btn" onClick={showQuestion} type="submit">
          Try another word!
        </Button>
      </React.Fragment>
    );
  };

  const showQuestion = () => {
    setView('question');
  };

  return (
    <React.Fragment>
      {head !== null && view === 'question' && (
        <React.Fragment>
          <header>
            <h2>Translate the word:</h2>

            <span>{head.nextWord}</span>
          </header>
          <form onSubmit={e => guessWord(e)}>
            <p>{`Your total score is: ${head.totalScore}`}</p>
            <div className="form-item">
              <label htmlFor="learn-guess-input">
                What's the translation for this word?
              </label>
              <Input
                ref={questionInput}
                id="learn-guess-input"
                name="question"
                required
              />
            </div>
            <Button type="submit">Submit your answer</Button>
          </form>

          <p className="word-form-info">
            You have answered this word correctly {head.wordCorrectCount} times.
          </p>
          <p className="word-form-info">
            You have answered this word incorrectly {head.wordIncorrectCount}{' '}
            times.
          </p>
        </React.Fragment>
      )}
      {view === 'answer' && head !== null && showResults()}
      {head === null && 'Loading'}
    </React.Fragment>
  );
}
