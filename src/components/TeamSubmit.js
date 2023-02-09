import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import { postTeam } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

const TeamSubmit = () => {
  const { image } = useSelector(store => ({ image: store.image }));

  const [focused, setFocused] = useState(false);
  const [team, setTeam] = useState('');
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    if (!focused) {
      setTeam('');
      setErrors({});
    }
  }, [focused]);

  useEffect(() => {
    setErrors({});
  }, [team]);

  const pendingApiCall = useApiProgress('post', '/api/1.0/teames');

  const onClickTeamup = async () => {
    const body = {
      content: team
    };

    try {
      await postTeam(body);
      setFocused(false);
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  let textAreaClass = 'form-control';
  if (errors.content) {
    textAreaClass += ' is-invalid';
  }

  return (
    <div className="card p-1 flex-row">
      <ProfileImageWithDefault image={image} width="32" height="32" className="rounded-circle me-1" />
      <div className="flex-fill">
      <textarea
          className={textAreaClass}
          rows={focused ? '3' : '1'}
          onFocus={() => setFocused(true)}
          onChange={event => setTeam(event.target.value)}
          value={team}
        />
        <div className="invalid-feedback">{errors.content}</div>
        {focused && (
          <div className="text-end mt-1">
            <ButtonWithProgress
              className="btn btn-primary mt-1"
              onClick={onClickTeamup}
              text="Teamup"
              pendingApiCall={pendingApiCall}
              disabled={pendingApiCall}
            />
            <button className="btn btn-light d-inline-flex ms-1 mt-1" onClick={() => setFocused(false)} disabled={pendingApiCall}>
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