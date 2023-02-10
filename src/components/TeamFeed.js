import React, { useState, useEffect } from 'react';
import { getTeames } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import TeamView from './TeamView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';

const TeamFeed = () => {
  const [teamPage, setTeamPage] = useState({ content: [], last: true, number: 0 });
  const { t } = useTranslation();
  const pendingApiCall = useApiProgress('get', '/api/1.0/teames');

  useEffect(() => { 
    loadTeames();
  }, []);

  const loadTeames = async page => {
    try {
      const response = await getTeames(page);
      setTeamPage(previousTeamPage => ({
        ...response.data,
        content: [...previousTeamPage.content, ...response.data.content]
      }));
    } catch (error) {}
  };

  const { content, last, number } = teamPage;

  if (content.length === 0){
    return <div className="alert alert-secondary text-center">{pendingApiCall ? <Spinner /> : t('There are no teames')}</div>;
    }

  return (
    <div>
      {content.map(team => {
        return <TeamView key={team.id} team={team} />;
      })}
      {!last && (
        <div
        className="alert alert-secondary text-center"
        style={{ cursor: pendingApiCall ? 'not-allowed' : 'pointer' }}
        onClick={pendingApiCall ? () => {} : () => loadTeames(number + 1)}
      >
        {pendingApiCall ? <Spinner /> : t('Load old teames')}
        </div>
      )}
    </div>
  );

};

export default TeamFeed;