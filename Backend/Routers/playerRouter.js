const playerController=require('../Controllers/playerController');
const authenticateUser=require('../Middlewares/authenticationMiddleware');
const express=require('express');
const { route } = require('./authRouter');

const router=express.Router();
router.post('/players',authenticateUser,playerController.createPlayer);
router.get('/players',playerController.getPlayers);
router.get('/players/:id',authenticateUser,playerController.getSpecificPlayer);
router.put('/players/:id',authenticateUser,playerController.updatePlayer);
router.get('/user/players',authenticateUser,playerController.getCurrentUserPlayers);
router.delete('/players/:id',authenticateUser,playerController.deletePlayer);
router.get("/top-players",playerController.getTopPlayers)

module.exports=router;