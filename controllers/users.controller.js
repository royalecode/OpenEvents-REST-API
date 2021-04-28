const { connection: conn } = require("../database/connection");

async function getByEmail(email) {
    let query = `SELECT * FROM users where email = ?`;
    const [rows] = await conn.promise().query(query, [email]);
    return rows[0];
}
  
async function insert(user) {
    const [resultado] = await conn.promise().query("INSERT INTO users SET ?", [user]);
   
    user.id = resultado.insertId;
    delete user.password;
    return user;
}
  
async function login(req, res, next) {
    const bcrypt = require("bcrypt");
    const Joi = require('joi');

    const data = req.body;
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required(),
    });
    try {
      const value = await schema.validateAsync(data);
    }
    catch (err) { 
      return next({ status: 400, error: "El body no es correcto", trace: err})
    }

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
        res.status(200).json({ accessToken });
      });
    } catch (error) {
      next({ status: 500, error: "Recurso no encontrado", stacktrace: error });
    }
}
  
async function register(req, res, next) {
    const bcrypt = require("bcrypt");
    const Joi = require('joi');

    const data = req.body;
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required()
    });
    try {
      const value = await schema.validateAsync(data);
    }
    catch (err) { 
      return next({ status: 400, error: "El body no es correcto", trace: err})
    }

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
        res.status(201).json(response);
      } catch (ex) {
        next({ status: 409, error: "Error when insert user", trace: ex });
      }
    });
}

async function getAllUsers(req, res, next){
  try {
    let query = `SELECT id, name, last_name, image, email FROM users`;
    const [rows] = await conn.promise().query(query);
    res.status(200).json(rows);
  } catch (ex) {
    return next({ status: 500, error: "Error en el servidor", trace: ex});
  }
}

async function getUser(req, res, next){
  try{
    let query = `SELECT id, name, last_name, image, email FROM users WHERE id = ?`;
    const [rows] = await conn.promise().query(query, [req.params.id]);
    if(rows.length === 0){
      return next({
        status: 404,
        error: "El usuario no existe",
        trace: "ex",
      });
    }
    res.status(200).json(rows[0]);
  } catch (ex) {
    return next({ status: 500, error: "Error en el servidor", trace: ex});
  }
}

async function deleteUser(req, res, next) {
  try{
    let query = `DELETE FROM users WHERE id = ?`;
    const [rows] = await conn.promise().query(query, [req.User.id]);
    res.status(204).end();
  } catch (ex) {
    return next({ status: 500, error: "Error en el servidor", trace: ex});
  }
}

async function cerca(req, res, next){
  try{
    let s = req.query.s;
    const param = `%${s}%`;
    console.log(param);
    if(param){
      let query = `SELECT * FROM users WHERE name LIKE ? OR last_name LIKE ? OR email LIKE ?`;
      const [rows] = await conn.promise().query(query, [param, param, param]);

      const result = rows.map((e) => {
        delete e.password;
        return e;
      }).map(({id, name, last_name, image, email}) => ({id, name, last_name, image, email}));

      res.status(200).json(result);
    }else{
      return next({status: 400, error: "Querystring not found", trace: "Querystring" })
    }
  } catch (ex) {
    return next({ status: 500, error: "Error en el servidor", trace: ex});
  }
}

async function updateUser(req, res, next) {
  const bcrypt = require("bcrypt");
  const Joi = require('joi');

  const data = req.body;
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required()
  });
  try {
      const value = await schema.validateAsync(data);
  }
  catch (err) { 
      return next({ status: 400, error: "El body no es correcto", trace: err})
  }

  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;
  let user;

  bcrypt.hash(myPlaintextPassword, saltRounds, async (err, hash) => {
    if (err)
      next({
        status: 500,
        error: "error al encriptar el password",
        trace: err,
      });
    req.body.password = hash;
    try {
      user = {
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
      };

      const [resultado] = await conn.promise().query("UPDATE users SET ? WHERE users.id = ? ", [user, req.USER.id]);
      delete user.password;
      const [userUpdated] = await conn.promise().query("SELECT id, name, last_name, image, email FROM users WHERE id = ?", [req.USER.id]);
      
      res.status(200).json(userUpdated[0]);
    } catch (ex) {
      next({ status: 409, error: "Error when insert user", trace: ex });
    }
  });
}

async function events(req, res, next) {
  try{
    let id = req.params.id;
    let query = `SELECT * FROM events WHERE owner_id = ?`;
    const [rows] = await conn.promise().query(query, [id]);
    res.status(200).json(rows);
  } catch (ex) {
    return next({ status: 500, error: "Error en el servidor", trace: ex});
  }
}

async function futureEvents(req, res, next) {
  try{
    let id = req.params.id;
    let query = `SELECT * FROM events WHERE owner_id = ? AND eventStart_date > CURDATE()`;
    const [rows] = await conn.promise().query(query, [id]);
    res.status(200).json(rows);
  } catch (ex) {
    return next({ status: 500, error: "Error en el servidor", trace: ex});
  }
}

async function finishedEvents(req, res, next) {
  try{
    let id = req.params.id;
    let query = `SELECT * FROM events WHERE owner_id = ? AND eventEnd_date < CURDATE()`;
    const [rows] = await conn.promise().query(query, [id]);
    res.status(200).json(rows);
  } catch (ex) {
    return next({ status: 500, error: "Error en el servidor", trace: ex});
  }
}

async function currentEvents(req, res, next) {
  try{
    let id = req.params.id;
    let query = `SELECT * FROM events WHERE owner_id = ? AND eventStart_date < CURDATE() AND eventEnd_date > CURDATE()`;
    const [rows] = await conn.promise().query(query, [id]);
    res.status(200).json(rows);
  } catch (ex) {
    return next({ status: 500, error: "Error en el servidor", trace: ex});
  }
}

async function friends(req, res, next) {
  try{
    let id = req.params.id;
    let query = `SELECT u.id, u.name, u.last_name, u.image, u.email FROM users as u INNER JOIN friend ON u.id = friend.user_id_friend WHERE friend.status = 1 AND friend.user_id = ?`;
    const [rows] = await conn.promise().query(query, [id]);
    let query2 = `SELECT u.id, u.name, u.last_name, u.image, u.email FROM users as u INNER JOIN friend ON u.id = friend.user_id WHERE friend.status = 1 AND friend.user_id_friend = ?`;
    const [rows2] = await conn.promise().query(query2, [id]);
    rows.push(...rows2);
    res.status(200).json(rows);
  } catch (ex) {
    return next({ status: 500, error: "Error en el servidor", trace: ex});
  }
}

async function assistances(req, res, next) {
  try{
    let id = req.params.id;
    let query = `SELECT * FROM events as e INNER JOIN assistance as a ON e.id = a.event_id WHERE a.user_id = ?`;
    const [rows] = await conn.promise().query(query, [id]);
    rows.map((item) => {
      delete item.user_id;
      delete item.event_id;
      return item;
    });
    res.status(200).json(rows);
  } catch (ex) {
    return next({ status: 500, error: "Error en el servidor", trace: ex});
  }
}

async function assistancesFuture(req, res, next) {
  try{
    let id = req.params.id;
    let query = `SELECT * FROM events as e INNER JOIN assistance as a ON e.id = a.event_id WHERE a.user_id = ? AND e.eventStart_date > CURDATE()`;
    const [rows] = await conn.promise().query(query, [id]);
    rows.map((item) => {
      delete item.user_id;
      delete item.event_id;
      return item;
    });
    res.status(200).json(rows);
  } catch (ex) {
    return next({ status: 500, error: "Error en el servidor", trace: ex});
  }
}

async function assistancesFinished(req, res, next) {
  try{
    let id = req.params.id;
    let query = `SELECT * FROM events as e INNER JOIN assistance as a ON e.id = a.event_id WHERE a.user_id = ? AND e.eventEnd_date < CURDATE()`;
    const [rows] = await conn.promise().query(query, [id]);
    rows.map((item) => {
      delete item.user_id;
      delete item.event_id;
      return item;
    });
    res.status(200).json(rows);
  } catch (ex) {
    return next({ status: 500, error: "Error en el servidor", trace: ex});
  }
}

module.exports = { login, register, getAllUsers, getUser, deleteUser, cerca, updateUser,
   events, futureEvents, finishedEvents, currentEvents, friends, assistances, assistancesFuture,
    assistancesFinished };