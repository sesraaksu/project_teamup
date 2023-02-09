import React from 'react';
import UserList from '../components/UserList';
import { useSelector } from 'react-redux';
import TeamSubmit from '../components/TeamSubmit';

const HomePage = () => {
  const { isLoggedIn } = useSelector(store => ({ isLoggedIn: store.isLoggedIn }));
  return (
    <div className="container">
      <div className="row">
        <div className="col">{isLoggedIn && <TeamSubmit />}</div>
        <div className="col">
          <UserList />
        </div>
      </div>
    </div>
  );
};
export default HomePage;