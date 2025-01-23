import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import UserList from "./components/userList/UserList";
import UserForm from "./components/UserForm/UserForm";


const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  ]);

  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    
    setEditingUser(user);
    console.log("Editing user:", user);
    // Populate form with user details for editing
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

 // const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSave = (user) => {
    if (user.id) {
      // Edit user
      setUsers(
        users.map((u) => (u.id === user.id ? { ...u, ...user } : u))
      );
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
    <div>
     
      <div className="p-4">
      <button
        onClick={() => {
          setSelectedUser(null);
          setIsFormVisible(true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
      >
        Add User
      </button>
      {isFormVisible && (
        <UserForm
        initialData={selectedUser}
        onSave={handleSave}
        onCancel={handleCancel}
        />
      )}
    </div>
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;

