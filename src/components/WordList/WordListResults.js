import React from 'react';

export default function WordListResults(props) {
  const { correct_count, incorrect_count } = props;
  const total = correct_count + incorrect_count;
  return (
  <li>
    {correct_count} / {total}
  </li>
  );
}