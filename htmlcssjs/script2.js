/** @format */

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("currentUser");
  return storedUser ? JSON.parse(storedUser) : null;
};

const currentUser = getUserFromLocalStorage();

if (!currentUser) {
  console.error("User not found in local storage");
  window.location.href = "login.html";
}

const users = [
  {
    name: "John Doe",
    adhar: "1234567890",
    password: "user1",
    mob: "1234567890",
    email: "user1@gmail.com",
    address: "hubli",
  },
  {
    name: "Rohith",
    adhar: "1234567890",
    password: "user2",
    mob: "1234567890",
    email: "user2@gmail.com",
    address: "haveri",
  },
  {
    name: "Suresh",
    adhar: "1234567890",
    password: "user3",
    mob: "1234567890",
    email: "user3@hmail.com",
    address: "dharwad",
  },
];

const user = users.find((user) => user.email === currentUser.email);

if (user) {
  document.getElementById("userEmail").value = user.email;
  document.getElementById("userName").value = user.name;
  document.getElementById("userMob").value = user.mob; // Assuming you have an element with id "userMob"
  document.getElementById("userAddress").value = user.address;
  document.getElementById("userAdhar").value = user.adhar; // Assuming you have an element with id "userAdhar"
} else {
  console.error("User not found");
}
const updateUserDetails = () => {
  const name = document.getElementById("userName").value;
  const mob = document.getElementById("userMob").value;
  const email = document.getElementById("userEmail").value;
  const address = document.getElementById("userAddress").value;
  const adhar = document.getElementById("userAdhar").value;

  const userIndex = users.findIndex((user) => user.email === currentUser.email);

  if (userIndex !== -1) {
    document.getElementById("userName").value = name;
    document.getElementById("userMob").value = mob;
    document.getElementById("userAddress").value = address;
    document.getElementById("userAdhar").value = adhar;

    users[userIndex] = {
      ...users[userIndex],
      name,
      mob,
      address,
    };

    console.log(user);
    console.log(users[userIndex]);

    console.warn("User Details Updated Successfully");
  } else {
    console.error("User not found in the array");
  }
};
