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
    //questionInput.current;
  };

  return (
    <React.Fragment>
      {head !== null && (
        <form onSubmit={e => guessWord(e)}>
          {/* <input type='text' required /> */}
          <h2>Translate the word:</h2>
          <span>{head.nextWord}</span>
          <Input
            ref={questionInput}
            id="learning-question-input"
            name="question"
            required
          />
          <Button type="submit">Submit</Button>
        </form>
      )}
    </React.Fragment>
  );
}
