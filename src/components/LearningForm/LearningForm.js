import React, { useState, useContext, useEffect, useRef } from 'react';
import { Input, Required, Label } from '../Form/Form';
import Button from '../Button/Button';
import learningApiService from '../../services/learning-api-service';
import LanguageContext from '../../contexts/LanguageContext';
import './LearningForm.css';

export default function LearningForm(props) {
  const languageContext = useContext(LanguageContext);
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
  };

  return (
    <React.Fragment>
      {head !== null && (
        <>
          { console.log(head) }
          <h2>Translate the word: {head.nextWord}</h2>
          <form onSubmit={e => guessWord(e)}>
            <p className='word-form-info'>What's the Translation for this word?</p>
            <p className='word-form-info'>Correctly translated this word { head.wordCorrectCount } times</p>
            <p className='word-form-info'>Incorrect translation for this word { head.wordIncorrectCount } times</p>
            <p className='word-form-info'>Score: { head.totalScore }</p>
            <Input
              ref={questionInput}
              id='learning-question-input'
              name='question'
              required
            />
            <Button type='submit'>Submit</Button>
          </form>
        </>
      )}
    </React.Fragment>
  );
}
