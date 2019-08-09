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

router.post('/', async (req, res) => {
    const accountData = req.body;

    try {
        const account = await
        db('accounts').insert(accountData);
        res.status(201).json({ success: true, account });
    } catch (err) {
        res.status(500).json({ success: false, error: 'There was an error while adding your account data.', err });
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const update = req.body;

    try {
        const account = await
        db('accounts').where({id}).update(update);
        if(account) {
            res.status(200).json({ success: true, account});
        } else {
            res.status(404).json({ success: false, error: `Could not find account with ${id}` });
        }
    } catch (err) {
        res.status(500).json({ success: true, error: `There was an error while updating the account.`, err});
    }

});

