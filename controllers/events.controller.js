const { connection: conn } = require("../database/connection");

async function getAllEvents(req, res, next) {
    let t = req.query.t;
    if(t){
        let query = `SELECT * FROM events WHERE type LIKE ?`;
        const [rows] = await conn.promise().query(query, [t]);
        res.status(200).json(rows);
    }else{
        let query = `SELECT * FROM events`;
        const [rows] = await conn.promise().query(query);
        res.status(200).json(rows);
    }
}

async function getEvent(req, res, next) {
    let id = req.params.id;
    let query = `SELECT * FROM events WHERE id = ?`;
    const [rows] = await conn.promise().query(query, [id]);
    res.status(200).json(rows[0]);
}

async function deleteEvent(req, res, next){
    let id = req.params.id;
    let query = `SELECT owner_id FROM events WHERE id = ?`;
    const [rows] = await conn.promise().query(query, [id]);
    if(rows[0].owner_id == req.USER.id){
        let query2 = `DELETE FROM events WHERE id = ?`;
        const [rows2] = await conn.promise().query(query, [id]);
        res.status(200).end();
    }else{
        return next({
            status: 403,
            error: "No tienes permisos",
            trace: "ex",
        })
    }
    
}

async function assistances(req, res, next) {
    let id = req.params.id;
    let query = `SELECT * FROM users INNER JOIN assistance ON users.id = assistance.user_id WHERE assistance.event_id = ?`;
    const [rows] = await conn.promise().query(query, [id]);
    rows.map((item) => {
        delete item.user_id;
        delete item.event_id;
        delete item.password;
        return item;
    });
    return res.status(200).json(rows);
}

async function userAssistance(req, res, next) {
    let id_event = req.params.id;
    let id_user = req.params.user;
    let query = `SELECT a.user_id, a.event_id, a.puntuation, a.comentary FROM assistance as a WHERE a.user_id = ? AND a.event_id = ?`;
    const [rows] = await conn.promise().query(query, [id_user, id_event]);
    res.status(200).json(rows[0]);
}

async function createAssistance(req, res, next) {
    let id = req.params.id;
    let obj = {
        puntuation: req.body.puntuation,
        comentary: req.body.comentary
    };
    let query = `INSERT INTO assistance as a WHERE a.event_id = ? AND a.user_id = ?`;
    const [rows] = await conn.promise().query(query, [id, req.USER.id]);
    res.status(200).json(rows[0]);
}

async function deleteAssistance(req, res, next) {
    let id = req.params.id;
    let query = `DELETE FROM assistance as a WHERE a.user_id = ? AND a.event_id = ?`;
    const [rows] = await conn.promise().query(query, [req.USER.id, id]);
    res.status(204);
}

module.exports = { getAllEvents, getEvent, deleteEvent, assistances, userAssistance,
    createAssistance, deleteAssistance };