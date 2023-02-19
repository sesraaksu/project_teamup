import axios from 'axios';
export const signup = body => {
  return axios.post('/api/1.0/users', body);
};
export const login = creds => {
  return axios.post('/api/1.0/auth', {}, { auth: creds });
};
export const changeLanguage = language => {
  axios.defaults.headers['accept-language'] = language;
};
export const getUsers = (page = 0, size = 3) => {
  return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
};
export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`;
    axios.defaults.headers['Authorization'] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
};
export const getUser = username => {
  return axios.get(`/api/1.0/users/${username}`);
};
export const updateUser = (username, body) => {
  return axios.put(`/api/1.0/users/${username}`, body);
};
export const postTeam = team => {
  return axios.post('/api/1.0/teames', team);
};
export const getTeames = (username, page = 0) => {
  const path = username ? `/api/1.0/users/${username}/teames?page=` : '/api/1.0/teames?page=';
  return axios.get(path + page);
};
export const getOldTeames = (id, username) => {
  const path = username ? `/api/1.0/users/${username}/teames/${id}` : `/api/1.0/teames/${id}`;
  return axios.get(path);
};
export const getNewTeamCount = (id, username) => {
  const path = username ? `/api/1.0/users/${username}/teames/${id}?count=true` : `/api/1.0/teames/${id}?count=true`;
  return axios.get(path);
};

export const getNewTeames = (id, username) => {
  const path = username ? `/api/1.0/users/${username}/teames/${id}?direction=after` : `/api/1.0/teames/${id}?direction=after`;
  return axios.get(path);
};

export const postTeamAttachment = attachment => {
  return axios.post('/api/1.0/team-attachments', attachment);
};

export const deleteTeam = id => {
  return axios.delete(`/api/1.0/teames/${id}`);
};