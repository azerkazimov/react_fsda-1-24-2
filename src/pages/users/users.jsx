import { useEffect, useState } from "react";
import "./user.css";

export default function Users() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error(`HTTP xətası! status: ${response.status}`);
      }
      const data = await response.json();
      //   console.log(data); // check api data

      return data;
    } catch (error) {
      console.error("İstifadəçilər əldə edilərkən xəta:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  console.log(users); // check user list

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="error">
        <h1>Something went wrong</h1>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="container">
        <div className="header">
          <h1>Users list</h1>
          <p>
            This page displays a list of users fetched from an external API.
          </p>
        </div>

        <div className="users-list">
          {users?.map((user) => (
            <div class="user-card">
              <div class="card-header">
                <div class="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <div class="card-content">
                <h2 class="user-name">{user.name}</h2>
                <p class="user-username">@{user.username}</p>

                <div class="contact-info">
                  <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <a
                      href={`mailto:${user.email}`}
                      className="contact-text contact-link"
                    >
                      {user.email}
                    </a>
                  </div>

                  <div class="contact-item">
                    <span class="contact-icon">📞</span>
                    <a
                      href={`tel: ${user.phone}`}
                      className="contact-text contact-link"
                    >
                      {user.phone}
                    </a>
                  </div>

                  <div class="contact-item">
                    <span class="contact-icon">🌐</span>
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-text contact-link"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>

                <div class="address-info">
                  <div class="address-street">
                    {user.address.street}, {user.address.suite}
                  </div>
                  <div>
                    {user.address.city}, {user.address.zipcode}
                  </div>
                </div>

                <div class="company-info">
                  <div class="company-name">🏢 {user.company.name}</div>
                  <div class="company-catchphrase">
                    "{user.company.catchPhrase}"
                  </div>
                  <div class="company-bs">{user.company.bs}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
