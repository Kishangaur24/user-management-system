import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import UserList from "./components/userList/UserList";
import UserForm from "./components/UserForm/UserForm";

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsFormVisible(true);
    console.log("Editing user:", user);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSave = (user) => {
    if (user.id) {
      // Edit user
      setUsers(users.map((u) => (u.id === user.id ? { ...u, ...user } : u)));
    } else {
      // Add new user
      const newUser = { ...user, id: Date.now() }; // Assign a unique ID
      setUsers([...users, newUser]);
    }
    setIsFormVisible(false);
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setIsFormVisible(false);
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4">User Management System</h1>
        <button
          onClick={() => {
            setSelectedUser(null);
            setIsFormVisible(true);
          }}
          className="btn btn-success"
        >
          Add User
        </button>
      </div>

      {isFormVisible && (
        <div className="mb-4">
          <UserForm
            initialData={selectedUser}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
