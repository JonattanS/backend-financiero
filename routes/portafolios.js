const express = require('express');
const router = express.Router();
const pool = require('../db');

// Ej: GET /api/portafolios?adm_ciaid=...
router.get('/portafolios', async (req, res) => {
  try {
    // Puedes obtener adm_ciaid del token, sesión o del query param (lo más simple aquí)
    const adm_ciaid = req.query.adm_ciaid;
    if (!adm_ciaid) {
      return res.status(400).json({ success: false, message: "adm_ciaid requerido" });
    }

    // Extrae TODOS los porcod de nov_por para esa agencia
    const { rows } = await pool.query(
      'SELECT porcod FROM nov_por WHERE adm_ciaid = $1',
      [adm_ciaid]
    );
    // Devuelve solo el array de porcod válidos (por ejemplo: [1,2,3,11])
    const portafolios = rows.map(r => r.porcod);

    return res.json({ success: true, portafolios }); // Ej: { success: true, portafolios: [1,2,3] }
  } catch (err) {
    console.error('Error obteniendo portafolios:', err);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
});

module.exports = router;
