import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    fullName: "",
    phone: "",
  });
  const [users, setUsers] = useState([]);
  const [editClicked, setEditClicked] = useState({
    status: false,
    id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    let config = {
      method: "POST",
      url: `https://dataneuronbackend-cbwu.onrender.com/addData`,
      data,
    };
    let a = JSON.parse(localStorage.getItem("clickCount")).count+=1;
    localStorage.setItem("clickCount", JSON.stringify({ count: a }));
    await axios(config)
      .then((res) => {
        console.log(res.data);
        handleGetData();
        setData({
          fullName: "",
          phone: "",
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    handleGetData();
    localStorage.setItem("clickCount", JSON.stringify({ count: 1 }));
  }, []);

  const handleGetData = async () => {
    let config = {
      method: "GET",
      url: `https://dataneuronbackend-cbwu.onrender.com/getData`,
    };
    await axios(config)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleEditClick = (data) => {
    setData({
      fullName: data.fullName,
      phone: data.phone,
    });
    setEditClicked({ ...editClicked, status: true, id: data._id });
  };

  const handleUpdateClick = async () => {
    let obj = {
      ...data,
      _id: editClicked.id,
    };
    let config = {
      method: "PUT",
      url: `https://dataneuronbackend-cbwu.onrender.com/updateData`,
      data: obj,
    };
    await axios(config)
      .then((res) => {
        console.log(res.data);
        setEditClicked({ ...editClicked, status: false, id: "" });
        setData({
          fullName: "",
          phone: "",
        });
        handleGetData();
        let a = JSON.parse(localStorage.getItem("clickCount")).count+=1;
        localStorage.setItem("clickCount", JSON.stringify({ count: a }));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <main>
      <nav>
        <h3 style={{textAlign: "center"}}>Count: {JSON.parse(localStorage.getItem("clickCount"))?.count}</h3>
        <ul>
          <li>Nav Item</li>
          <li>Nav Item</li>
          <li>Nav Item</li> 
          <li>Nav Item</li>
        </ul>
      </nav>

      <header>
        <h1>Header Title</h1>
        <input
          type="text"
          name="fullName"
          value={data.fullName}
          placeholder="Enter your Full Name"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="phone"
          value={data.phone}
          placeholder="Enter your phone number"
          onChange={(e) => handleChange(e)}
        />
        {editClicked.status ? (
          <button onClick={() => handleUpdateClick()}>Update</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}

        <table id="tableContainer">
          <tr>
            <th>FullName</th>
            <th>Contact</th>
            <th>Edit</th>
          </tr>
          {users && users.length ?
            users.map((item) => (
              <tr key={item._id}>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>
                  <span>
                    <button onClick={() => handleEditClick(item)}>Edit</button>
                  </span>
                </td>
              </tr>
            )) : null}
        </table>
      </header>

      <section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
    </main>
  );
}

export default App;
