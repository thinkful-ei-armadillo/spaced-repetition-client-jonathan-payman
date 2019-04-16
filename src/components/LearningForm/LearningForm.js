import React, { useState, useContext, useEffect } from 'react';
import { Input, Required, Label } from '../Form/Form';
import learningApiService from '../../services/learning-api-service';
import LanguageContext from '../../contexts/LanguageContext';
export default function LearningForm(props) {

  const [questionInput] = useState(0);
  const Language = useContext(LanguageContext);

  useEffect(() => {
    learningApiService
      .getLanguageHead()
      
    Language.processNextWord()
  });

  return (
    <>
      <div>Translate the word: (word)</div>
      <form>
        <Input ref={ this.questionInput }
          id='learning-question-input'
          name='question'
          required />
      </form>
    </>
  );
}