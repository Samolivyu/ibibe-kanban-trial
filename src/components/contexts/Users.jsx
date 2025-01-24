import React from 'react';
import { useParams } from 'react-router-dom';
import Subtask from '../dashboard/Substask';

const Users = () => {
  const { userId } = useParams();
  return <Subtask userId={userId} />;
};

export default Users;