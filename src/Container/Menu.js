import React, { useState, useEffect } from "react";

function Menu(props) {
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = "https://dummyapi.io/data/v1/user?page=1&limit=50";

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl, {
      method: "get",
      headers: { "app-id": "639172c734f59a65dd76d340" },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserdata(data.data);
        setLoading(false);
      });
  }, []);

  const handleCreate = async (newData) => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      const data = await response.json();
      setUserdata([...userdata, data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      const updatedUserdata = userdata.map((user) =>
        user.id === id ? data : user
      );
      setUserdata(updatedUserdata);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await fetch(`${apiUrl}/${id}`, {
        method: "delete",
        headers: { "app-id": "639172c734f59a65dd76d340" },
      });
      const updatedUserdata = userdata.filter((user) => user.id !== id);
      setUserdata(updatedUserdata);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>firstName</th>
              <th>id</th>
              <th>lastName</th>
              <th>picture</th>
              <th>title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userdata.map((row) => {
              const { id, firstName, lastName, picture, title } = row;

              return (
                <tr key={id}>
                  <td>{firstName}</td>
                  <td>{id}</td>
                  <td>{lastName}</td>
                  <td>
                    <img src={picture} alt={`${firstName} ${lastName}`} />
                  </td>
                  <td>{title}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleUpdate(id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default Menu;
