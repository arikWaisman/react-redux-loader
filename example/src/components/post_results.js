import React, { Fragment } from 'react';

const PostResults = props => {
  if (!props.post) {
    return null;
  }

  const { title, body } = props.post;

  if (!title || !body) {
    return null;
  }

  return (
    <Fragment>
      <h3>Fetched Post Data:</h3>
      <h4>{title}</h4>
      <p>{body}</p>
    </Fragment>
  );
};

export default PostResults;
