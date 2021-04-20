const { connection: conn } = require("../database/connection");

async function getByEmail(email) {
    let query = `SELECT * FROM users where email = ?`;
    const [rows] = await conn.promise().query(query, [email]);
    return rows[0];
}
  
async function insert(user) {
    const [resultado] = await conn
      .promise()
      .query("INSERT INTO users SET ?", [user]);
  
    user.id = resultado.insertId;
    delete user.password;
    return user;
}
  
async function login(req, res, next) {
    const bcrypt = require("bcrypt");
    try {
      let user;
      try {
        user = await getByEmail(req.body.email);
      } catch (ex) {
        return next({
          status: 500,
          error: "Error en la base de datos",
          trace: "ex",
        });
      }
  
      if (!user) return next({ status: 400, error: "Email or password incorrect1" });
      
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (error) return next({ status: 400, error: "Email or password incorrect2" });
        if (!result) return next({ status: 400, error: "Email or password incorrect3" });
  
        delete user.password;
  
        const jwt = require("jsonwebtoken");
        const accessToken = jwt.sign(
          JSON.stringify(user),
          process.env.ACCESS_TOKEN_SECRET
        );
        res.json({ accessToken });
        res.status(200).end();
      });
    } catch (error) {
      next({ status: 500, error: "Recurso no encontrado", stacktrace: error });
    }
}
  
async function register(req, res, next) {
    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
  
    let user = await getByEmail(req.body.email);
    if(user) return next({ status: 400, error: "Register information not correct" });

    bcrypt.hash(myPlaintextPassword, saltRounds, async (err, hash) => {
      if (err)
        next({
          status: 500,
          error: "error al encriptar el password",
          trace: err,
        });
      req.body.password = hash;
      try {
        const response = await insert(req.body);
        res.json(response);
        res.status(201).end();
      } catch (ex) {
        next({ status: 409, error: "Error when insert user", trace: ex });
      }
    });
}

async function getAllUsers(req, res, next){
  
  let query = `SELECT * FROM users`;
  const [rows] = await conn.promise().query(query);

  const result = rows.map((e) => {
    delete e.password;
    return e;
  }).map(({id, name, last_name, image, email}) => ({id, name, last_name, image, email}));
  
  res.json(result);
  res.status(200).end();
}

async function getUser(req, res, next){

  let query = `SELECT * FROM users WHERE id = ?`;
  const [rows] = await conn.promise().query(query, [req.params.id]);

  const result = rows.map((e) => {
    delete e.password;
    return e;
  }).map(({id, name, last_name, image, email}) => ({id, name, last_name, image, email}));
  
  res.json(result[0]);
  res.status(200).end();
}

async function deleteUser(req, res, next) {
  
  let query = `DELETE FROM users WHERE id = ?`;
  const [rows] = await conn.promise().query(query, [req.User.id]);
  res.status(204).end();
}

async function search(req, res, next){
  console.log(" hola");
  console.log(req.query.s);
  let s = req.query.s;
  let query = `SELECT * FROM users WHERE name LIKE '%?%' OR last_name LIKE '%?%' OR email LIKE '%?%'`;
  const [rows] = await conn.promise().query(query, [s, s, s]);

  const result = rows.map((e) => {
    delete e.password;
    return e;
  }).map(({id, name, last_name, image, email}) => ({id, name, last_name, image, email}));

  res.json(result);
  res.status(200).end();
}

module.exports = { login, register, getAllUsers, getUser, deleteUser, search };