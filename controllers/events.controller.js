const { connection: conn } = require("../database/connection");

async function getAllEvents(req, res, next) {
    try{
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
    } catch (ex) {
        return next({ status: 500, error: "Error en el servidor", trace: ex});
    }
}

async function getEvent(req, res, next) {
    try{
        let id = req.params.id;
        let query = `SELECT * FROM events WHERE id = ?`;
        const [rows] = await conn.promise().query(query, [id]);
        res.status(200).json(rows[0]);
    } catch (ex) {
        return next({ status: 500, error: "Error en el servidor", trace: ex});
    }
}

async function deleteEvent(req, res, next){
    try{
        let id = req.params.id;
        let query = `SELECT owner_id FROM events WHERE id = ?`;
        const [rows] = await conn.promise().query(query, [id]);
        if(rows[0].owner_id ==  req.USER.id){
            let query2 = `DELETE FROM events WHERE id = ?`;
            const [rows2] = await conn.promise().query(query2, [id]);
            res.status(204).json(rows2);
        }else{
            return next({
                status: 403,
                error: "No tienes permisos",
                trace: "ex",
            })
        }
    } catch (ex) {
        return next({ status: 500, error: "Error en el servidor", trace: ex});
    }
}

async function assistances(req, res, next) {
    try{
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
    } catch (ex) {
        return next({ status: 500, error: "Error en el servidor", trace: ex});
    }
}

async function userAssistance(req, res, next) {
    try{
        let id_event = req.params.id;
        let id_user = req.params.user;
        let query = `SELECT a.user_id, a.event_id, a.puntuation, a.comentary FROM assistance as a WHERE a.user_id = ? AND a.event_id = ?`;
        const [rows] = await conn.promise().query(query, [id_user, id_event]);
        res.status(200).json(rows[0]);
    } catch (ex) {
        return next({ status: 500, error: "Error en el servidor", trace: ex});
    }
}

async function createAssistance(req, res, next) {
    const Joi = require('joi');

    const data = req.body;
    const schema = Joi.object().keys({
      puntuation: Joi.number().min(1).max(5),
      comentary: Joi.string(),
    });
    try {
      const value = await schema.validateAsync(data);
    }
    catch (err) { 
      return next({ status: 400, error: "El body no es correcto", trace: err})
    }

    let id = req.params.id;
    let obj = {
        user_id: req.USER.id, 
        event_id: Number(id),
        puntuation: req.body.puntuation,
        comentary: req.body.comentary
    };
    try{
        let query = `INSERT INTO assistance SET ?`;
        const [rows] = await conn.promise().query(query, [obj]);
        res.status(201).json(obj);
    } catch (ex) {
        return next({ status: 409, error: "Error al insertar", trace: ex})
    }
}

async function deleteAssistance(req, res, next) {
    try{
        let id = Number(req.params.id);
        let query = `DELETE FROM assistance WHERE assistance.user_id = ? AND assistance.event_id = ?`;
        const [rows] = await conn.promise().query(query, [req.USER.id, id]);
        res.status(204);
    } catch (ex) {
        return next({ status: 500, error: "Error en el servidor", trace: ex});
    }
}

async function updateAssistance(req, res, next) {
    const Joi = require('joi');

    const data = req.body;
    const schema = Joi.object().keys({
      puntuation: Joi.number().min(1).max(5),
      comentary: Joi.string(),
    });
    try {
      const value = await schema.validateAsync(data);
    }
    catch (err) { 
      return next({ status: 400, error: "El body no es correcto", trace: err})
    }

    let id = req.params.id;
    let obj = {
        user_id: req.USER.id, 
        event_id: Number(id),
        puntuation: req.body.puntuation,
        comentary: req.body.comentary
    };
    try{
        let query = `UPDATE assistance as a SET ? WHERE a.event_id = ? AND a.user_id = ?`;
        const [rows] = await conn.promise().query(query, [obj, id, req.USER.id]);
        res.status(200).json(obj);
    } catch (ex) {
        return next({ status: 409, error: "Error al insertar", trace: ex})
    }
}

async function createEvent(req, res, next) {
    const Joi = require('joi');
    try{
        const data = req.body;
        const schema = Joi.object().keys({
        name: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required(),
        eventStart_date: Joi.date().required(),
        eventEnd_date: Joi.date().required(),
        n_participators: Joi.number().required(),
        type: Joi.string().required()
        });

        try {
        const value = await schema.validateAsync(data);
        }
        catch (err) { 
        return next({ status: 400, error: "El body no es correcto", trace: err})
        }

        let obj = {
            name: req.body.name, 
            owner_id: req.USER.id,
            create_date: new Date(),
            location: req.body.location,
            description: req.body.description,
            eventStart_date: req.body.eventStart_date,
            eventEnd_date: req.body.eventEnd_date,
            n_participators: req.body.n_participators,
            type: req.body.type
        }

        try{
            let query = `INSERT INTO events SET ?`;
            const [rows] = await conn.promise().query(query, [obj]);
            let query2 = `SELECT * FROM events WHERE id = ?`;
            console.log(rows.insertId);
            const [rows2] = await conn.promise().query(query2, [rows.insertId])
            res.status(201).json(rows2[0]);
        } catch (ex) {
            return next({ status: 409, error: "Error al insertar", trace: ex})
        }
    } catch (ex) {
        return next({ status: 500, error: "Error en el servidor", trace: ex});
    }
}

async function updateEvent(req, res, next) {
    const Joi = require('joi');
    try{
        const data = req.body;

        const schema = Joi.object().keys({
        name: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required(),
        eventStart_date: Joi.date().required(),
        eventEnd_date: Joi.date().required(),
        n_participators: Joi.number().required(),
        type: Joi.string().required()
        });

        try {
            const value = await schema.validateAsync(data);
        }catch (err) { 
            return next({ status: 400, error: "El body no es correcto", trace: err})
        }

        let id = req.params.id;
        let query = `SELECT owner_id FROM events WHERE id = ?`;
        const [rows] = await conn.promise().query(query, [id]);
        if(rows[0].owner_id == req.USER.id){
            return next({
                status: 403,
                error: "No tienes permisos",
                trace: "ex",
            })
        }else{

            let obj = {
                name: req.body.name, 
                location: req.body.location,
                description: req.body.description,
                eventStart_date: req.body.eventStart_date,
                eventEnd_date: req.body.eventEnd_date,
                n_participators: req.body.n_participators,
                type: req.body.type
            }

            try{
                let query = `UPDATE events SET ? WHERE id = ?`;
                const [rows] = await conn.promise().query(query, [obj, id]);
                let query2 = `SELECT * FROM events WHERE id = ?`;
                const [rows2] = await conn.promise().query(query2, [id])
                res.status(201).json(rows2[0]);
            } catch (ex) {
                return next({ status: 409, error: "Error al actualizar", trace: ex})
            }
        }
    } catch (ex) {
        return next({ status: 500, error: "Error en el servidor", trace: ex});
    }

}

module.exports = { getAllEvents, getEvent, deleteEvent, assistances, userAssistance,
    createAssistance, deleteAssistance, updateAssistance, createEvent, updateEvent };