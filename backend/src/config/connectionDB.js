const db = require('./db');

const getBodegas = async() => {
    try {
        const bodegas = await db.query("SELECT * FROM bodegas");
        console.log(bodegas.rows);
    } catch (error) {
        console.error('Error connection DB');
    }
}

getBodegas();