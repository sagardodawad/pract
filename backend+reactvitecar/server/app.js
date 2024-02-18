/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "car_management",
});

app.delete("/deleteoldcar", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    console.log("Connected to the database for deleting old cars");

    connection.query(
      "DELETE FROM car WHERE year_manufacturer < 2000",
      (err, result) => {
        connection.release();
        if (!err) {
          console.log("Oldest cars have been removed");
          res.send("Oldest cars have been removed");
        } else {
          console.error(err);
          res.status(500).send("Error deleting data from the database");
        }
      }
    );
  });
});
app.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    console.log(`connected as id ${connection.threadId}`);

    connection.query("SELECT * from car", (err, rows) => {
      connection.release();
      if (!err) {
        res.send(rows);
      } else {
        console.error(err);
        res.status(500).send("Error fetching data from database");
      }
    });
  });
});
app.get("/carswith2019", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    console.log(`connected as id ${connection.threadId}`);

    connection.query(
      "SELECT * from car WHERE year_manufacturer = 2019",
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(rows);
        } else {
          console.error(err);
          res.status(500).send("Error fetching data from database");
        }
      }
    );
  });
});

app.delete("/:carId", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // console.log(`connected with carId ${connection.threadcarId}`);
    connection.query(
      "DELETE from car WHERE carId = ?",
      [req.params.carId],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(
            `car with the record id ${req.params.carId} has been removed`
          );
        } else {
          console.error(err);
          res.status(500).send("Error deleting data from database");
        }
      }
    );
  });
});

app.post("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const { modelName, year_manufacturer, speed, price, custId } = req.body;

    // Check if custId exists in the customer table
    connection.query(
      "SELECT * FROM customer WHERE custId = ?",
      [custId],
      (err, customerResult) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error checking customer existence");
          connection.release();
          return;
        }

        if (customerResult.length === 0) {
          // If custId doesn't exist in the customer table, do not proceed with the insert
          res.status(400).send("Invalid custId. Customer not found.");
          connection.release();
          return;
        }

        // custId exists in the customer table, proceed with the insert
        connection.query(
          "INSERT INTO car (modelName, year_manufacturer, speed, price, custId) VALUES (?, ?, ?, ?, ?)",
          [modelName, year_manufacturer, speed, price, custId],
          (err, result) => {
            connection.release();
            if (!err) {
              res.send(`Car with record name ${modelName} has been added`);
            } else {
              console.error(err);
              res.status(500).send("Error adding data to the database");
            }
          }
        );
      }
    );
  });
});

// app.post('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }

//     const {  modelName,
//       year_manufacturer,
//       speed,
//       price,
//       custId } = req.body;
//     connection.query(

//       'INSERT INTO car ( modelName,year_manufacturer, speed,price,custId) VALUES (?, ?, ?, ?,?)',
//       [modelName, year_manufacturer, speed, price,custId],
//       (err, result) => {
//         connection.release();
//         if (!err) {
//           res.send(`car with record name ${modelName} has been added`);
//         } else {
//           console.error(err);
//           res.status(500).send('Error adding data to the database');
//         }
//       }
//     );
//   });
// });

app.get("/display", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    connection.query(
      "SELECT * FROM car ORDER BY year_manufacturer DESC LIMIT 5",
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(rows);
        } else {
          console.error(err);
          res.status(500).send("Error fetching data from database");
        }
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}................`);
});
