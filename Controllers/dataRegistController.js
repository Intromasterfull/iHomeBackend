const { response } = require('express');
const db = require('../Controllers/database');

const dataPost = (req, res = response) => {
    const {relay_1,relay_2,relay_3,relay_4,relay_5,relay_6,relay_7,relay_8,dateToRun} = req.body;

    try{
        const stmt = db.prepare(`
            INSERT INTO relay_schedule (
                relay_1,
                relay_2,
                relay_3,
                relay_4,
                relay_5,
                relay_6,
                relay_7,
                relay_8,
                dateToRun
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(
            relay_1,
            relay_2,
            relay_3,
            relay_4,
            relay_5,
            relay_6,
            relay_7,
            relay_8,
            dateToRun
        );

        res.status(201).json({
            success: true,
            id: result.lastInsertRowid
        });
        console.log("Nuevo registro guardado");
    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        });
    }

}

const dataDeleteById = (req, res = response) =>{
    try{
        const id = Number(req.params.id);

        if(!Number.isInteger(id)){
            return res.status(400).json({
                success: false,
                error: 'id invalido'
            });
        }

        const result = db.prepare('DELETE FROM relay_schedule WHERE id = ?').run(id);

        if(result.changes === 0){
            return res.status(404).json({
                success: false,
                error: 'No existe registro ${id}'
            });
        }
        res.json({success: true, id});
        console.log('Registro ${id} eliminado');
    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const dataDeleteAll = (req, res = response) =>{
    try{
        if(req.query.confirm !== 'true'){
            return res.status(400).json({
                success: false,
                error: 'Agrega confirm true para borrar todos los datos'
            });
        }
        const borrar = db.transaction(() => {
            const result = db.prepare('DELETE FROM relay_schedule').run();
            //Reiniciamos contador
            db.prepare("DELETE FROM sqlite_sequence WHERE name = 'relay_schedule'").run();
            return result.changes;
        });
        const eliminados = borrar();

        res.json({
            success: true,
            eliminados
        });
        console.log('Se eliminaron los registros');

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
    dataDeleteById,
    dataDeleteAll
};