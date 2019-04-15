import React from 'react';

export function WordList(props) {
  const { words } = props;
  return (
    <>
      <li>{words}</li>
    </>
  );
}

export function WordListResults(props) {
  const { correct_count, incorrect_count } = props;
  return (
    <>
      <li />
    </>
  );
}
