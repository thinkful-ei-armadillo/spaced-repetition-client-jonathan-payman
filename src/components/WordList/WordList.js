import React from 'react';

export function WordList(props) {
  const { word } = props;
  const { correct_count, incorrect_count } = props.word;
  return (
    <li className="word-list-item">
      <h4>{word.original}</h4>
      <span>
        <div>correct answer count: {correct_count}</div>
        <div>incorrect answer count: {incorrect_count}</div>
      </span>
    </li>
  );
}
