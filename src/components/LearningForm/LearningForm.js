import React, { useState, useContext, useEffect, useRef } from 'react';
import { Input, Required, Label } from '../Form/Form';
import Button from '../Button/Button'
import learningApiService from '../../services/learning-api-service';
import LanguageContext from '../../contexts/LanguageContext';
export default function LearningForm(props) {

  const [wordInput, updateWord] = useState('word');
  const questionInput = useRef(null);
  const Language = useContext(LanguageContext);

  useEffect(() => {
    learningApiService
      .getLanguageHead()
      .then(word => console.log(word))
    Language.processNextWord()
  });

  updateWord(() => {
    wordInput = questionInput
  })

  return (
    <>
      <div>Translate the word: (word)</div>
      <form onSubmit={  }>
        {/* <input type='text' required /> */}
        <Input ref={ questionInput }
          id='learning-question-input'
          name='question'
          required />
        <Button type='submit'>Submit</Button>
      </form>
    </>
  );
}