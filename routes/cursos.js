const express = require('express');
const router = express.Router();

const cursos = require('../public/cursos.json');

router.get('/', (req, res) => {
    res.json(cursos);
});

module.exports = router;