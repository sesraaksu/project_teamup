import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import { postTeam, postTeamAttachment } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './Input';
import AutoUploadImage from './AutoUploadImage';

const TeamSubmit = () => {
  const { image } = useSelector(store => ({ image: store.image }));

  const [focused, setFocused] = useState(false);
  const [team, setTeam] = useState('');
  const [errors, setErrors] = useState({});
  const [newImage, setNewImage] = useState();
  const [attachmentId, setAttachmentId] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (!focused) {
      setTeam('');
      setErrors({});
      setNewImage();
      setAttachmentId();
    }
  }, [focused]);

  useEffect(() => {
    setErrors({});
  }, [team]);

  const pendingApiCall = useApiProgress('post', '/api/1.0/teames', true);
  const pendingFileUpload = useApiProgress('post', '/api/1.0/team-attachments', true);


  const onClickTeamup = async () => {
    const body = {
      content: team,
      attachmentId: attachmentId
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

  const onChangeFile = event => {
    if (event.target.files.length < 1) {
      return;
    }
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
      uploadFile(file);
    };
    fileReader.readAsDataURL(file);
  };

  const uploadFile = async file => {
    const attachment = new FormData();
    attachment.append('file', file);
    const response = await postTeamAttachment(attachment);
    setAttachmentId(response.data.id);
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
          <>
           {!newImage && <Input type="file" onChange={onChangeFile} />}
            {newImage && <AutoUploadImage image={newImage} uploading={pendingFileUpload} />}
          <div className="text-right mt-1">
            <ButtonWithProgress
              className="btn btn-primary mt-1"
              onClick={onClickTeamup}
              text="Teamup"
              pendingApiCall={pendingApiCall}
              disabled={pendingApiCall || pendingFileUpload}
            />
            <button className="btn btn-light d-inline-flex ms-1 mt-1" onClick={() => setFocused(false)} disabled={pendingApiCall || pendingFileUpload}>
              <i className="material-icons">close</i>
              {t('Cancel')}
            </button>
          </div>
        </>
        )}
      </div>
    </div>
  );
};

export default TeamSubmit;