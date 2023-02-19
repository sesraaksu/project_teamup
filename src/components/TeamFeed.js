import React, { useState, useEffect } from 'react';
import { getTeames, getOldTeames, getNewTeamCount, getNewTeames } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import TeamView from './TeamView';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';
const TeamFeed = () => {
  const [teamPage, setTeamPage] = useState({ content: [], last: true, number: 0 });
  const [newTeamCount, setNewTeamCount] = useState(0);
  const { t } = useTranslation();
  const { username } = useParams();
  const path = username ? `/api/1.0/users/${username}/teames?page=` : '/api/1.0/teames?page=';
  const initialTeamLoadProgress = useApiProgress('get', path);
  let lastTeamId = 0;
  let firstTeamId = 0;
  if (teamPage.content.length > 0) {
    firstTeamId = teamPage.content[0].id;
    const lastTeamIndex = teamPage.content.length - 1;
    lastTeamId = teamPage.content[lastTeamIndex].id;
  }
  const oldTeamPath = username ? `/api/1.0/users/${username}/teames/${lastTeamId}` : `/api/1.0/teames/${lastTeamId}`;
  const loadOldTeamesProgress = useApiProgress('get', oldTeamPath, true);

  const newTeamPath = username
    ? `/api/1.0/users/${username}/teames/${firstTeamId}?direction=after`
    : `/api/1.0/teames/${firstTeamId}?direction=after`;

  const loadNewTeamesProgress = useApiProgress('get', newTeamPath, true);

  useEffect(() => {
    const getCount = async () => {
      const response = await getNewTeamCount(firstTeamId, username);
      setNewTeamCount(response.data.count);
    };
    let looper = setInterval(getCount, 5000);
    return function cleanup() {
      clearInterval(looper);
    };
  }, [firstTeamId, username]);
  useEffect(() => {
    const loadTeames = async page => {
      try {
        const response = await getTeames(username, page);
        setTeamPage(previousTeamPage => ({
          ...response.data,
          content: [...previousTeamPage.content, ...response.data.content]
        }));
      } catch (error) {}
    };
    loadTeames();
  }, [username]);
  const loadOldTeames = async () => {
    const response = await getOldTeames(lastTeamId, username);
    setTeamPage(previousTeamPage => ({
      ...response.data,
      content: [...previousTeamPage.content, ...response.data.content]
    }));
  };

  const loadNewTeames = async () => {
    const response = await getNewTeames(firstTeamId, username);
    setTeamPage(previousTeamPage => ({
      ...previousTeamPage,
      content: [...response.data, ...previousTeamPage.content]
    }));
    setNewTeamCount(0);
  };

  const onDeleteTeamSuccess = id => {
    setTeamPage(previousTeamPage => ({
      ...previousTeamPage,
      content: previousTeamPage.content.filter(team => team.id !== id)
    }));
  };

  const { content, last } = teamPage;

  if (content.length === 0) {
    return <div className="alert alert-secondary text-center">{initialTeamLoadProgress ? <Spinner /> : t('There are no teames')}</div>;
  }

  return (
    <div>
      {newTeamCount > 0 && (
        <div
          className="alert alert-secondary text-center mb-1"
          style={{ cursor: loadNewTeamesProgress ? 'not-allowed' : 'pointer' }}
          onClick={loadNewTeamesProgress ? () => {} : loadNewTeames}
        >
          {loadNewTeamesProgress ? <Spinner /> : t('There are new teames')}
        </div>
      )}
      {content.map(team => {
        return <TeamView key={team.id} team={team} onDeleteHoax={onDeleteTeamSuccess} />;
      })}
      {!last && (
        <div
          className="alert alert-secondary text-center"
          style={{ cursor: loadOldTeamesProgress ? 'not-allowed' : 'pointer' }}
          onClick={loadOldTeamesProgress ? () => {} : loadOldTeames}
        >
          {loadOldTeamesProgress ? <Spinner /> : t('Load old teames')}
        </div>
      )}
    </div>
  );
};
export default TeamFeed;