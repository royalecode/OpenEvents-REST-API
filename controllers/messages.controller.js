const { connection: conn } = require("../database/connection");

async function newMessage(req, res, next) {
    const message = {
        content: req.body.content,
        user_id_send: req.body.user_id_send,
        user_id_recived: req.body.user_id_recived
    }
    let query = `INSERT INTO message SET ?`;
    const [rows] = await conn.promise().query(query, [message]);
    res.status(204).end();
}

async function usersChat(req, res, next) {
    let query = `SELECT users.id, users.name, users.last_name, users.email FROM users INNER JOIN
     message ON users.id = message.user_id_send WHERE message.user_id_recived = ? 
     GROUP BY users.id`;
    const [rows] = await conn.promise().query(query, [req.USER.id]);
    res.status(200).json(rows);
}

async function messagesChat(req, res, next) {
    let id = req.params.id;
    let query = `SELECT * FROM message as m WHERE (m.user_id_send = ? AND m.user_id_recived = ?) OR (m.user_id_send = ? AND m.user_id_recived = ?)`;
    const [rows] = await conn.promise().query(query, [id, req.USER.id, req.USER.id, id]);
    res.status(200).json(rows);
}

module.exports = { newMessage, usersChat, messagesChat };