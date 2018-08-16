import * as React from 'react';

const NoMatch: React.StatelessComponent = () => {
  if (process.env.NODE_ENV === 'production') {
    typeof location !== 'undefined' && location.replace('/404');
  }

  return <div>No Match</div>;
};

export default NoMatch;
