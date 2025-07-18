// backend-financiero/routes/clientes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/clientes', async (req, res) => {
  try {
    // Ejemplo de SQL, ajusta según tu estructura real
    const result = await pool.query(`
      SELECT ter_nit, ter_raz, SUM(mov_val) AS tot_val 
      FROM adm_usr -- o la tabla apropiada, ajusta según tu modelo
      GROUP BY ter_nit, ter_raz
      ORDER BY ter_raz
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
