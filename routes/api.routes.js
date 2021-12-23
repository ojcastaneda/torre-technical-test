const express = require('express');
const router = express.Router();
const { retrieveUser, retrieveUsersWithSkill, retrieveUsersWithName } = require('../logic/user.logic');

router.get('/user/:username', retrieveUser);

router.post('/usersWithSkill', retrieveUsersWithSkill);

router.post('/usersWithName', retrieveUsersWithName);

module.exports = router;
