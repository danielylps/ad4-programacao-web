const express = require('express');
const router = express.Router();

const professores = require('../public/professores.json');

router.get('/', (req, res) => {
    res.json(professores);
});

module.exports = router;