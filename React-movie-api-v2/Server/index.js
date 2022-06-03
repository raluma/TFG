const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Add mysql database connection
const db = mysql.createPool({
  host: 'mysql', // the host name MYSQL_DATABASE: node_mysql
  user: 'root', // database user MYSQL_USER: MYSQL_USER
  password: 'root', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: 'mobee' // database name MYSQL_HOST_IP: mysql_db
})

// Enable cors security headers
app.use(cors())

// add an express method to parse the POST method
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// get all of the users in the database (by GET method)
app.get('/get/allUsers', (req, res) => {
  const SelectQuery = "SELECT * FROM USUARIOS";
  db.query(SelectQuery, (err, result) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.send(result)
  })
})

// get all the data of one user in the database by name (by POST method)
app.post('/get/user', (req, res) => {
  const id = req.body.id;
  const SelectQuery = "SELECT * FROM USUARIOS WHERE ID = ?";
  db.query(SelectQuery, id,(err, result) => {
    if (err) res.status(400).send('ERROR: ' + err + ' RESULT: ' + result)
    else res.send(result)
  })
})

// get all the data of one user in the database by name (by POST method)
app.post('/get/user/name', (req, res) => {
  const name = req.body.name;
  const SelectQuery = "SELECT * FROM USUARIOS WHERE NOMBRE = ?";
  db.query(SelectQuery, name,(err, result) => {
    if (err) res.status(400).send('ERROR: ' + err + ' RESULT: ' + result)
    else res.send(result)
  })
})

// get all the data of one user in the database by email (by POST method)
app.post('/get/user/email', (req, res) => {
  const email = req.body.email;
  const SelectQuery = "SELECT * FROM USUARIOS WHERE CORREO = ?";
  db.query(SelectQuery, email,(err, result) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.send(result)
  })
})

// add a user to the database (by POST method)
app.post("/insert/user", (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const InsertQuery = "INSERT INTO USUARIOS (NOMBRE, CORREO, CONTRASENA) VALUES (?, ?, ?)";
  db.query(InsertQuery, [name, email, password], (err) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.status(200).send('OK')
  })
})

// delete a user from the database
app.delete("/delete/user", (req, res) => {
  const id = req.body.id;
  const DeleteQuery = "DELETE FROM USUARIOS WHERE ID = ?";

  db.query(DeleteQuery, id, (err) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.status(200).send('OK')
  })
})

// update a user name
app.put("/update/user/Name", (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const UpdateQuery = "UPDATE USUARIOS SET NOMBRE = ? WHERE ID = ?";

  db.query(UpdateQuery, [name, userId], (err) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.status(200).send('OK')
  })
})

// update a user email
app.put("/update/user/Email", (req, res) => {
  const userId = req.body.userId;
  const email = req.body.email;
  const UpdateQuery = "UPDATE USUARIOS SET CORREO = ? WHERE ID = ?";

  db.query(UpdateQuery, [email, userId], (err) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.status(200).send('OK')
  })
})

// update a user password
app.put("/update/user/Password/", (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;
  const UpdateQuery = "UPDATE USUARIOS SET CONTRASENA = ? WHERE ID = ?";

  db.query(UpdateQuery, [password, userId], (err) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.status(200).send('OK')
  })
})

// get all the multimedia of one user in the database by id (by POST method)
app.post('/get/fav/multimedia', (req, res) => {
  const id = req.body.id_user;
  const SelectQuery = "SELECT * FROM FAVORITOS WHERE ID_USUARIO = ?";
  db.query(SelectQuery, id ,(err, result) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.send(result)
  })
})

app.post('/search/fav/multimedia', (req, res) => {
  const type = req.body.type;
  const id_multi= req.body.id_multi;
  const id_user= req.body.id_user;
  const SelectQuery = "SELECT * FROM FAVORITOS WHERE TIPO = ? AND ID_MULTIMEDIA = ? AND ID_USUARIO = ?";
  db.query(SelectQuery, [type, id_multi, id_user] ,(err, result) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.send(result)
  })
})

// add a multimedia to fav table in the database 
app.post("/insert/fav/multimedia", (req, res) => {
  const title = req.body.title;
  const type = req.body.type;
  const id_multi= req.body.id_multi;
  const id_user= req.body.id_user;

  const InsertQuery = "INSERT INTO FAVORITOS (NOMBRE, TIPO, ID_MULTIMEDIA, ID_USUARIO) VALUES (?, ?, ?, ?)";
  db.query(InsertQuery, [title, type, id_multi, id_user], (err) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.status(200).send('OK')
  })
})

// delete a multimedia from fav table of the database
app.delete("/delete/fav/multimedia", (req, res) => {
  const type = req.body.type;
  const id_multi= req.body.id_multi;
  const id_user= req.body.id_user;

  const DeleteQuery = 
  "DELETE FROM FAVORITOS WHERE TIPO = ? AND ID_MULTIMEDIA = ? AND ID_USUARIO = ?";

  db.query(DeleteQuery, [type, id_multi, id_user], (err) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.status(200).send('OK')
  })
})

// get all the multimedia of one user in the database by id (by POST method)
app.post('/get/list/multimedia', (req, res) => {
  const id = req.body.id_user;
  const SelectQuery = "SELECT * FROM LISTA WHERE ID_USUARIO = ?";
  db.query(SelectQuery, id ,(err, result) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.send(result)
  })
})

// add a multimedia to list table in the database
app.post("/insert/list/multimedia", (req, res) => {
  const title = req.body.title;
  const type = req.body.type;
  const id_multi= req.body.id_multi;
  const id_user= req.body.id_user;

  const InsertQuery =
  "INSERT INTO LISTA (NOMBRE, TIPO, ID_MULTIMEDIA,  ID_USUARIO) VALUES (?, ?, ?, ?)";
  db.query(InsertQuery, [title, type, id_multi, id_user], (err) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.status(200).send('OK')
  })
})

// delete a multimedia from fav list of the database
app.delete("/delete/list/multimedia", (req, res) => {
  const type = req.body.type;
  const id_multi= req.body.id_multi;
  const id_user= req.body.id_user;

  const DeleteQuery = 
  "DELETE FROM LISTA WHERE TIPO = ? AND ID_MULTIMEDIA = ? AND ID_USUARIO = ?";

  db.query(DeleteQuery, [type, id_multi, id_user], (err) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.status(200).send('OK')
  })
})

app.post('/search/list/multimedia', (req, res) => {
  const type = req.body.type;
  const id_multi= req.body.id_multi;
  const id_user= req.body.id_user;
  const SelectQuery = "SELECT * FROM LISTA WHERE TIPO = ? AND ID_MULTIMEDIA = ? AND ID_USUARIO = ?";
  db.query(SelectQuery, [type, id_multi, id_user] ,(err, result) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.send(result)
  })
})








// get all fav in the database (by GET method)
app.get('/get/fav/', (req, res) => {
  const SelectQuery = "SELECT * FROM FAVORITOS";
  db.query(SelectQuery, (err, result) => {
    if (err) res.status(400).send('BAD REQUEST')
    else res.send(result)
  })
})


app.listen('3001', () => { })