const router = require("express").Router();
const {assignpanelgroup, deletepanelgroup, viewPanelgroup} = require('../controllers/panelgroupcontroller.js')

router.post('/add', assignpanelgroup);

router.delete('/delete/:id', deletepanelgroup);

router.get('/:id', viewPanelgroup);

// router.get('/:id', viewOneBooking);

module.exports = router;