// src/utils/userList.js

const User = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
  }));
};

export default User;