const { response } = require('express');
const db = require('../Controllers/database');

const dataPost = (req, res = response) => {
    const {relay_1,relay_2,relay_3,relay_4,relay_5,relay_6,dateToRun} = req.body;

    try{
        const stmt = db.prepare(`
            INSERT INTO relay_schedule (
                relay_1,
                relay_2,
                relay_3,
                relay_4,
                relay_5,
                dateToRun
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(
            relay_1,
            relay_2,
            relay_3,
            relay_4,
            relay_5,
            dateToRun
        );

        res.status(201).json({
            success: true,
            id: result.lastInsertRowid
        });
    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

}

const dataGet = (req, res = response) => {
    try {

        const rows = db.prepare(`
            SELECT *
            FROM relay_schedule
            ORDER BY dateToRun
        `).all();

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
}

module.exports = {
    dataPost,
    dataGet,
};