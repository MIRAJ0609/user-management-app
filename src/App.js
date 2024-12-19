import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';

const App = () => {
  const [editingUser, setEditingUser] = useState(null); // Track user being edited
  const [users, setUsers] = useState([]); // Centralized user list

  const handleUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null); // Close edit form after saving
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/users"
          element={
            <>
              <UsersList
                users={users}
                setUsers={setUsers}
                setEditingUser={setEditingUser}
              />
              {editingUser && (
                <EditUser
                  user={editingUser}
                  onClose={() => setEditingUser(null)}
                  onSave={handleUpdate}
                />
              )}
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
