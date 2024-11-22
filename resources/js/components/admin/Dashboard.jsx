import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import swal from 'sweetalert';
import './dashboard.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [adminLoading, setAdminLoading] = useState({});
  
  // Pagination states
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPageTeams, setCurrentPageTeams] = useState(1);
  const [usersPerPage] = useState(5); // Change this number to show more or fewer users per page
  const [teamsPerPage] = useState(5); // Change this number to show more or fewer teams per page

  useEffect(() => {
    document.title = "Admin Dashboard";
    fetchUsers();
    fetchTeams();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/users/view');
      data.status === 200 ? setUsers(data.users) : swal("Error", data.message || "An error occurred", "error");
    } catch {
      swal("Error", "Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/team/view');
      data.status === 200 ? setTeams(data.teams) : swal("Error", data.message || "An error occurred", "error");
    } catch {
      swal("Error", "Failed to load teams", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleLoadingState = (id, setLoadingFunc) => {
    setLoadingFunc(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAdminToggle = async (e, id) => {
    e.preventDefault();
    toggleLoadingState(id, setAdminLoading);

    try {
        const { data } = await axios.post(`/api/users/make-admin/${id}`, {}, {
            validateStatus: (status) => status < 500, // Treat 400-499 as valid responses
        });

        if (data.status === 200) {
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === id
                        ? { ...user, role_as: user.role_as === 1 ? 0 : 1 }
                        : user
                )
            );
            swal("Success", data.message, "success");
        } else if (data.status === 403) {
            swal("Error", data.message, "error");
        } else {
            swal("Error", data.message, "error");
        }
    } catch (error) {
        swal("Error", "Failed to update user role", "error");
        console.error("Error details:", error);
    } finally {
        toggleLoadingState(id, setAdminLoading);
    }
};

  const handleDelete = async (e, id, isUser = true) => {
    e.preventDefault();
    toggleLoadingState(id, setDeleteLoading);
    const apiUrl = isUser ? `/api/users/delete/${id}` : `/api/team/delete/${id}`;
    const updateFunc = isUser ? setUsers : setTeams;

    try {
        const { data } = await axios.post(apiUrl, {}, {
            validateStatus: (status) => status < 500, // Treat 400-499 as valid responses
        });

        if (data.status === 200) {
            updateFunc((prev) => prev.filter((item) => item.id !== id));
            swal("Success", data.message, "success");
        } else if (data.status === 403) {
            swal("Error", data.message, "error");
        } else {
            swal("Error", data.message, "error");
        }
    } catch (error) {
        swal("Error", `Failed to delete ${isUser ? 'user' : 'team'}`, "error");
        console.error("Error details:", error);
    } finally {
        toggleLoadingState(id, setDeleteLoading);
    }
};

  const renderSpinner = isLoading => (
    isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Delete'
  );

  // Pagination Logic for Users
  const indexOfLastUser = currentPageUsers * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const renderUsers = () => currentUsers.map(user => (
    <tr key={user.id} className="dashboard-row">
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role_as === 0 ? "User" : "Admin"}</td>
      <td>{new Date(user.created_at).toLocaleString('en-GB')}</td>
      <td><Link to={`/admin/user/edit/${user.id}`} className="btn btn-link btn-sm">Edit</Link></td>
      <td>
        <button className="btn btn-link btn-sm" onClick={e => handleAdminToggle(e, user.id)} disabled={adminLoading[user.id]}>
          {adminLoading[user.id] ? renderSpinner(true) : '✅'}
        </button>
      </td>
      <td>
        <button className="btn btn-link btn-sm text-danger" onClick={e => handleDelete(e, user.id)} disabled={deleteLoading[user.id]}>
          {renderSpinner(deleteLoading[user.id])}
        </button>
      </td>
    </tr>
  ));

  // Pagination Logic for Teams
  const indexOfLastTeam = currentPageTeams * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  const renderTeams = () => currentTeams.map(team => (
    <tr key={team.id} className="dashboard-row">
      <td>{team.id}</td>
      <td>{team.name}</td>
      <td>{team.role}</td>
      <td><img src={`/${team.image}`} width="100px" alt={team.name} /></td>
      <td>{team.status === 0 ? "Visible" : "Hidden"}</td>
      <td>{new Date(team.created_at).toLocaleString('en-GB')}</td>
      <td><Link to={`/admin/teams/edit/${team.id}`} className="btn btn-link btn-sm">Edit</Link></td>
      <td>
        <button className="btn btn-link btn-sm text-danger" onClick={e => handleDelete(e, team.id, false)} disabled={deleteLoading[team.id]}>
          {renderSpinner(deleteLoading[team.id])}
        </button>
      </td>
    </tr>
  ));

  const totalPagesUsers = Math.ceil(users.length / usersPerPage);
  const totalPagesTeams = Math.ceil(teams.length / teamsPerPage);

  const handlePageChangeUsers = (pageNumber) => setCurrentPageUsers(pageNumber);
  const handlePageChangeTeams = (pageNumber) => setCurrentPageTeams(pageNumber);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="dashboard-subheading">Manage users, teams, and more with efficiency.</p>
      </header>

      <section className="dashboard-section">
        <h2>Registered Users</h2>
        <table className="dashboard-table">
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
          <tbody>{renderUsers()}</tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPagesUsers }, (_, index) => (
            <button key={index + 1} onClick={() => handlePageChangeUsers(index + 1)} className={`page-button ${currentPageUsers === index + 1 ? 'active' : ''}`}>
              {index + 1}
            </button>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Teams</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Image</th>
             <th>Status</th>
              <th>Joined</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderTeams()}</tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPagesTeams }, (_, index) => (
            <button key={index + 1} onClick={() => handlePageChangeTeams(index + 1)} className={`page-button ${currentPageTeams === index + 1 ? 'active' : ''}`}>
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
