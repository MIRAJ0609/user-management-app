import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = ({ setEditingUser, users, setUsers }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, [page, setUsers]);

  // Filter users based on the search input
  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(search.toLowerCase()) ||
          user.last_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      alert('User deleted successfully.');
    } catch (err) {
      alert('Failed to delete user.');
    }
  };

  return (
    <div className="users-container">
      <h2>Users List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* User Cards */}
      <div className="user-cards">
        {filteredUsers.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.avatar} alt={user.first_name} />
            <p>
              {user.first_name} {user.last_name}
            </p>
            <div className="actions">
              <button className="edit-btn" onClick={() => setEditingUser(user)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="pagination-buttons">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UsersList;
