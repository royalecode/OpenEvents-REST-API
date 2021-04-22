const { connection: conn } = require("../database/connection");

async function getRequests(req, res, next) {
    let query = `SELECT u.id, u.name, u.last_name, u.image, u.email FROM users as u INNER JOIN friend ON friend.user_id = u.id WHERE friend.user_id_friend = ? AND friend.status = 0`;
    const [rows] = await conn.promise().query(query, [req.USER.id]);
    res.status(200).json(rows);
}

async function getFriends(req, res, next) {
    let query = `SELECT u.id, u.name, u.last_name, u.image, u.email FROM users as u INNER JOIN friend ON friend.user_id = u.id WHERE friend.user_id_friend = ? AND friend.status = 1`;
    const [rows] = await conn.promise().query(query, [req.USER.id]);
    let query2 = `SELECT u.id, u.name, u.last_name, u.image, u.email FROM users as u INNER JOIN friend ON friend.user_id_friend = u.id WHERE friend.user_id = ? AND friend.status = 1`;
    const [rows2] = await conn.promise().query(query2, [req.USER.id]);
    rows.push(...rows2);
    res.status(200).json(rows);
}

async function requestFriendShip(req, res, next) {
    let id = req.params.id;
    const friendShip = {
        user_id: req.USER.id, 
        user_id_friend: id,
        status: 0
    }
    try{
    let query = `INSERT INTO friend SET ?`;
    const [rows] = await conn.promise().query(query, [friendShip]);
    res.status(204).json(rows);
    } catch (ex) {
        next({ status: 409, error: "Error when insert friendship", trace: ex });
    }
}

async function acceptRequest(req, res, next) {
    let id = req.params.id;
    const friendShip = {
        user_id: id, 
        user_id_friend: req.USER.id,
        status: 1
    }
    try{
    let query = `UPDATE friend SET ? WHERE friend.user_id = ? AND friend.user_id_friend = ?`;
    const [rows] = await conn.promise().query(query, [friendShip, id, req.USER.id]);
    if(rows.affectedRows === 0){
        next({ status: 409, error: "Error when insert friendship", trace: rows });
    }
    res.status(204).json(rows);
    } catch (ex) {
        next({ status: 500, error: "Error en la base de datos", trace: ex });
    }
}

async function declineRequest(req, res, next) {
    let id = req.params.id;
    try{
        let query = `DELETE FROM friend WHERE friend.user_id = ? AND friend.user_id_friend = ?`;
        const [rows] = await conn.promise().query(query, [id, req.USER.id]);
        if(rows.affectedRows === 0){
            next({ status: 409, error: "Error when delete friendship", trace: rows });
        }
        res.status(204);
    } catch (ex) {
        next({ status: 500, error: "Error en la base de datos", trace: ex });
    }
}

module.exports = { getRequests, getFriends, requestFriendShip, acceptRequest, declineRequest }