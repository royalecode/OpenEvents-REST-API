const { connection: conn } = require("../database/connection");

async function getRequests(req, res, next) {
    try{
        let query = `SELECT u.id, u.name, u.last_name, u.image, u.email FROM users as u INNER JOIN friends ON friends.user_id = u.id WHERE friends.user_id_friend = ? AND friends.status = 0`;
        const [rows] = await conn.promise().query(query, [req.USER.id]);
        res.status(200).json(rows);
    } catch (ex) {
        return next({ status: 500, error: "Error en el servidor", trace: ex});
    }
}

async function getFriends(req, res, next) {
    try{
        let query = `SELECT u.id, u.name, u.last_name, u.image, u.email FROM users as u INNER JOIN friends ON friends.user_id = u.id WHERE friends.user_id_friend = ? AND friends.status = 1`;
        const [rows] = await conn.promise().query(query, [req.USER.id]);
        let query2 = `SELECT u.id, u.name, u.last_name, u.image, u.email FROM users as u INNER JOIN friends ON friends.user_id_friend = u.id WHERE friends.user_id = ? AND friends.status = 1`;
        const [rows2] = await conn.promise().query(query2, [req.USER.id]);
        rows.push(...rows2);
        res.status(200).json(rows);
    } catch (ex) {
        return next({status: 500, error: "Error en el servidor", trace: ex});
    }
}

async function requestFriendShip(req, res, next) {
    try{
        let id = req.params.id;
        const friendShip = {
            user_id: req.USER.id, 
            user_id_friend: id,
            status: 0
        }
        try{
            let query = `INSERT INTO friends SET ?`;
            const [rows] = await conn.promise().query(query, [friendShip]);
            res.status(204).json(rows);
        } catch (ex) {
            next({ status: 409, error: "Error when insert friendship", trace: ex });
        }
    } catch (ex) {
        return next({status: 500, error: "Error en el servidor", trace: ex});
    }
}

async function acceptRequest(req, res, next) {
    try{
        let id = req.params.id;
        const friendShip = {
            user_id: id, 
            user_id_friend: req.USER.id,
            status: 1
        }
    
        let query = `UPDATE friends SET ? WHERE friends.user_id = ? AND friends.user_id_friend = ?`;
        const [rows] = await conn.promise().query(query, [friendShip, id, req.USER.id]);
        if(rows.affectedRows === 0){
            next({ status: 409, error: "Error when update friendship", trace: rows });
        }
        res.status(204).json(rows);
    } catch (ex) {
        next({ status: 500, error: "Error en la base de datos", trace: ex });
    }
}

async function declineRequest(req, res, next) {
    try{
        let id = req.params.id;
    
        let query = `DELETE FROM friends WHERE (friends.user_id = ? AND friends.user_id_friend = ?) OR (friends.user_id = ? AND friends.user_id_friend = ? AND friends.status = 1)`;
        const [rows] = await conn.promise().query(query, [id, req.USER.id, req.USER.id, id]);
        if(rows.affectedRows === 0){
            next({ status: 409, error: "Error when delete friendship", trace: rows });
        }
        res.status(204).end();
    } catch (ex) {
        next({ status: 500, error: "Error en el servidor", trace: ex });
    }
}

module.exports = { getRequests, getFriends, requestFriendShip, acceptRequest, declineRequest }