import React from 'react';

export function WordList(props) {
  const { word } = props;
  return (
    <li>
      {word.original}
    </li>
  )
}

export function WordListResults(props) {
  const { correct_count, incorrect_count } = props.word;
  const total = correct_count + incorrect_count;
  return (
    <li>
      {correct_count} / {total}
    </li>
  );
}
