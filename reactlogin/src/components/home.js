/** @format */

import React, { useState, useEffect } from "react";
import users from "./users";
const Home = () => {
  const [user, setUser] = useState({});

  const [allUsers, setALL] = useState([]);

  useEffect(() => {
    const logemail = JSON.parse(localStorage.getItem("currentuser"));
    console.log(logemail);

    const us = users.find((u) => logemail.email === u.email);

    console.log(us);

    setUser(us);

    const t = {
      mob: us.mob,
      address: us.address,
    };
    setTemp(t);
    setALL(users);
  }, [user]);

  const [temp, setTemp] = useState({
    mob: "",
    address: "",
  });
  const handleChange = (e) => {
    setTemp({ ...temp, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const index = users.findIndex((user1) => user1.email === user.email);

    if (index !== -1) {
      const mob = temp.mob;
      const address = temp.address;

      users[index] = {
        ...users[index],
        mob,
        address,
      };

      setUser({ ...users, [mob]: temp.mob, [address]: temp.address });
      console.log(users[index]);

      setALL(users);
    }
  };
  return (
    <>
      {/* <label htmlFor="name">name:</label>
       */}
      <p>{user.email}</p>
      <p>{user.adhar}</p>
      <p>{user.address}</p>
      <p>{user.mob}</p>
      <p>{user.name}</p>

      <div>
        <input
          type="text"
          id="mob"
          name="mob"
          value={temp.mob}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          id="name"
          name="address"
          value={temp.address}
          onChange={(e) => handleChange(e)}
        />
        <button type="button" onClick={handleUpdate}>
          update
        </button>
      </div>

      {allUsers.map((u1, index) => (
        <div id={index} key={index}>
          <p>{u1.email}</p>
          <p>{u1.adhar}</p>
          <p>{u1.address}</p>
          <p>{u1.mob}</p>
          <p>{u1.name}</p>
        </div>
      ))}
    </>
  );
};

export default Home;
