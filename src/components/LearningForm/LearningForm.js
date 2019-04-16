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
  const questionInput = useRef(null);

  useEffect(() => {
    learningApiService.getLanguageHead().then(word => {
      console.log(word)
      setHead(word);
      languageContext.processNextWord(word);
    });
  }, []);

  const guessWord = e => {
    e.preventDefault();
    console.log(questionInput.current.value);
    learningApiService.makeGuess(questionInput.current.value).then(response => {
      console.log(response)
      languageContext.processNextWord(response.nextWord);
      setHead(response.nextWord);
      console.log(response.correct)
    });
    //questionInput.current;
  };

  return (
    <React.Fragment>
      {head !== null && (
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
      {head === null && 'Loading'}
    </React.Fragment>
  );
}
