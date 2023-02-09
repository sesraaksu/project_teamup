import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import { postTeam } from '../api/apiCalls';

const TeamSubmit = () => {
  const { image } = useSelector(store => ({ image: store.image }));

  const [focused, setFocused] = useState(false);
  const [team, setTeam] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (!focused) {
      setTeam('');
    }
  }, [focused]);

  const onClickTeamup = async () => {
    const body = {
      content: team
    };

    try {
      await postTeam(body);
    } catch (error) {}
  };

  return (
    <div className="card p-1 flex-row">
      <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle me-1" />
      <div className="flex-fill">
      <textarea
          className="form-control"
          rows={focused ? '3' : '1'}
          onFocus={() => setFocused(true)}
          onChange={event => setTeam(event.target.value)}
          value={team}
        />
        {focused && (
          <div className="text-end mt-1">
            <button className="btn btn-primary mt-1" onClick={onClickTeamup}>
              Teamup
            </button>
            <button className="btn btn-light d-inline-flex ms-1 mt-1" onClick={() => setFocused(false)}>
              <i className="material-icons">close</i>
              {t('Cancel')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSubmit;