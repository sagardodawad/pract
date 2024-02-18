/** @format */

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

const currentUser = {
  email: "",
  password: "",
};

const HandleLogin = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password);

  const user = users.find((user) => user.email === email);

  console.log(user);

  if (user) {
    if (user.password === password) {
      console.warn("Login Success");
      console.log(user);
      currentUser.email = user.email;
      currentUser.password = user.password;

      console.log(currentUser);

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      window.location.href = `userDetails.html`;
    } else {
      alert("Invalid Password");
    }
  } else {
    alert("User Not Found");
  }
};
