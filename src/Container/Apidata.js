import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Api = "https://dummyapi.io/data/v1/user?page=1&limit=50";

function Apidata() {
  const Nevigate = useNavigate();
  const [userdata, setUserdata] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // console.log(userdata);
  // console.log(isLoading);
  <InfinitySpin />;

  useEffect(() => {
    setLoading(true);
    fetch(Api, {
      method: "get",
      headers: { "app-id": "639172c734f59a65dd76d340" },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserdata(data.data);
        // obj in array in obj
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`https://dummyapi.io/data/v1/user/${id}`, {
      method: "DELETE",
      headers: { "app-id": "639172c734f59a65dd76d340" },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        toast.success("you aer secceefuly delete!", {
          position: toast.POSITION.Top_right,
        });
        const newData = userdata.filter((user) => user.id !== id);
        setUserdata(newData);
      });
  };
  const handleCreateUser = () => {
    Nevigate("/Createuser");
  };
  const handleEdit = (id) => {
    // console.log(id);
    Nevigate(`/Editapidata/${id}`);
  };

//   const onChange = (e) => {
//    const get=e.target.value;
   
//  const apidat= userdata
//     const filter = apidat.filter((i) => i.firstName.includes(get));

// console.log(filter);
   
//   };
  return (
    <div className="text-center">
      <ToastContainer />
      <br></br>
      <label>search</label>
      {/* <input
        type="search"
        name="search-bar"
        id="search-bar"
        placeholder="search here..... "
        onChange={onChange}
      /> */}
      <button className="btn btn-primary  " onClick={() => handleCreateUser()}>
        Create User
      </button>
      {isLoading && (
        <div className="text-center">
          <InfinitySpin />
        </div>
      )}
      <table className="table p-5">
        <thead>
          <tr>
            <th>firstName</th>
            <th>id</th>
            <th>lastName</th>
            <th>picture</th>
            <th>title</th>
            <th>Action</th>
            <th>Action</th>
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
                    onClick={() => handleEdit(id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Apidata;
