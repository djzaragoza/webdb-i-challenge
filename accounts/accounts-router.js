const express = require('express');

const db = require('../data/dbconfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await
        db('accounts');
            res.status(200).json({success: true, accounts});
    } catch (err) {
        res.status(500).json({ success: false, error: "There was an error while retrieving the accounts.", err });
    }
});

router.get('/:id', async (req, res) => {
    const{id} = req.params;

    try {
        const [account] = await
        db('accounts').where({id});
        if(account) {
            res.status(200).json({ success: true, account});
        } else {
            res.status(404).json({ success: false, error: `Could not find account with ${id}`});
        } 
    } catch(err) {
            res.status(500).json({ success: false, error: 'There was an error while finding the account.', err });
        }
});