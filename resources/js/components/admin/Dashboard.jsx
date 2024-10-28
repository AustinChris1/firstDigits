import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import swal from 'sweetalert';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [adminLoading, setAdminLoading] = useState({});

 // Function to fetch users
 const fetchUsers = () => {
  setLoading(true);
  axios.get('/api/users/view')
    .then((res) => {
      console.log(res.data.users);
      if (res.data.status === 200) {
        setUsers(res.data.users);
      } else {
        swal("Error", res.data.message || "An error occurred", "error");
      }
    })
    .catch((error) => {
      swal("Error", "Failed to load users", "error");
      console.error(error);
    })
    .finally(() => setLoading(false));
};

// Initial user fetch on component mount
useEffect(() => {
  document.title = "Dashboard";
  fetchUsers();
}, []);

const makeAdmin = (e, id) => {
  e.preventDefault();
  setAdminLoading((prev) => ({ ...prev, [id]: true }));

  axios.post(`/api/users/make-admin/${id}`)
      .then((res) => {
          if (res.data.status === 200) {
              // Update the user's role in the local state
              setUsers((prevUsers) => 
                  prevUsers.map((user) => 
                      user.id === id ? { ...user, role_as: user.role_as === 1 ? 0 : 1 } : user
                  )
              );
              swal("Success", res.data.message, "success");
          } else {
              swal("Error", res.data.message, "error");
          }
      })
      .catch((error) => {
          swal("Error", "Failed to make user an admin", "error");
          console.error(error);
      })
      .finally(() => setAdminLoading((prev) => ({ ...prev, [id]: false })));
};

const deleteUser = (e, id) => {
  e.preventDefault();
  setDeleteLoading((prev) => ({ ...prev, [id]: true }));

  axios.post(`/api/users/delete/${id}`)
    .then((res) => {
      if (res.data.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        swal("Success", res.data.message, "success");
      } else {
        swal("Error", res.data.message, "error");
      }
    })
    .catch((error) => {
      swal("Error", "Failed to delete user", "error");
      console.error(error);
    })
    .finally(() => setDeleteLoading((prev) => ({ ...prev, [id]: false })));
};

const renderUsers = () => {
  return users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role_as === 0 ? "User" : "Admin"}</td>
      <td>{new Date(user.created_at).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
      <td>
        <Link to={`/admin/user/edit/${user.id}`} className="btn btn-primary btn-sm">Edit</Link>
      </td>
      <td>
        <button
          className="btn btn-secondary btn-sm"
          onClick={(e) => makeAdmin(e, user.id)}
          disabled={adminLoading[user.id]}
        >
          {adminLoading[user.id] ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            '✅'
          )}
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => deleteUser(e, user.id)}
          disabled={deleteLoading[user.id]}
        >
          {deleteLoading[user.id] ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            'Delete'
          )}
        </button>
      </td>
    </tr>
  ));
};

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="card px-4 mt-3">
      <div className="card-header">
        <h4>
          Registered Users
        </h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Edit</th>
                <th>Change Role</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {renderUsers()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
