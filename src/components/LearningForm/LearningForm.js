import React, { useState, useContext, useEffect, useRef } from 'react';
import { Input, Required, Label } from '../Form/Form';
import Button from '../Button/Button';
import learningApiService from '../../services/learning-api-service';
import LanguageContext from '../../contexts/LanguageContext';

export default function LearningForm(props) {
  const languageContext = useContext(LanguageContext);
  //const [wordInput, updateWord] = useState(null);
  const [head, setHead] = useState(null);
  const questionInput = useRef(null);

  useEffect(() => {
    learningApiService.getLanguageHead().then(word => {
      setHead(word);
      languageContext.processNextWord(word);
    });
  }, []);

  const guessWord = e => {
    e.preventDefault();
    console.log(questionInput.current.value);
    learningApiService.makeGuess(questionInput.current.value).then(response => {
      response.processNextWord(response.nextWord);
      setHead(response.nextWord);
    });
    //questionInput.current;
  };

  return (
    <React.Fragment>
      {head !== null && (
        <React.Fragment>
          <h2>Translate the word:</h2>
          <span>{head.nextWord}</span>
          <form onSubmit={e => guessWord(e)}>
            {/* <input type='text' required /> */}
            <p>{`Your total score is: ${head.totalScore}`}</p>

            <label htmlFor="learn-guess-input">
              What's the translation for this word?
            </label>
            <Input
              ref={questionInput}
              id="learn-guess-input"
              name="question"
              required
            />
            <Button type="submit">Submit your answer</Button>
          </form>
        </React.Fragment>
      )}
      {head === null && 'Loading'}
    </React.Fragment>
  );
}
