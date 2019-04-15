import React from 'react';

export function WordList(props) {
  const { words } = props;
  return (
    <ul className='word-list'>
      <li>{ words }</li>
    </ul>
  )
}

export function WordListResults(props) {
  const { correct_count, incorrect_count } = props;
  return (
  <ul className='word-list-results'>
    <li></li>
  </ul>
  )
}