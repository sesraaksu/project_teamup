import React from 'react';

const TeamView = props => {
  const { team } = props;
  return <div className="card p-1">{team.content}</div>;
};

export default TeamView;