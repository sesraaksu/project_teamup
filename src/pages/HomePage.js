import React from 'react';
import UserList from '../components/UserList';
import { useSelector } from 'react-redux';
import TeamSubmit from '../components/TeamSubmit';
import TeamFeed from '../components/TeamFeed';

const HomePage = () => {
  const { isLoggedIn } = useSelector(store => ({ isLoggedIn: store.isLoggedIn }));
  return (
    <div className="container">
      <div className="row">
      <div className="col">
          {isLoggedIn && (
            <div className="mb-1">
              <TeamSubmit />
            </div>
          )}
          <TeamFeed />
        </div>
        <div className="col">
          <UserList />
        </div>
      </div>
    </div>
  );
};
export default HomePage;