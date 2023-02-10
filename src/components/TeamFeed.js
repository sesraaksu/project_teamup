import React, { useState, useEffect } from 'react';
import { getTeames } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import TeamView from './TeamView';

const TeamFeed = () => {
  const [teamPage, setTeamPage] = useState({ content: [] });
  const { t } = useTranslation();

  useEffect(() => {
    const loadTeames = async () => {
      try {
        const response = await getTeames();
        setTeamPage(response.data);
      } catch (error) {}
    };
    loadTeames();
  }, []);

  const { content } = teamPage;

  if (content.length === 0){
    return <div className="alert alert-secondary text-center">{t('There are no teames')}</div>;
  }

  return (
    <div>
      {content.map(team => {
        return <TeamView key={team.id} team={team} />;
      })}
    </div>
  );

};

export default TeamFeed;