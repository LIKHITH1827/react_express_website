const { v4: uuidv4 } = require("uuid")
let router = require('express').Router();
const itemmod = require('./Items_model');


router.post('/insert', async (req, res) => {
    try {
        const reqj = { item_name: req.body.item_name, item_image: req.body.item_image, item_quantity: req.body.item_quantity, item_Id: uuidv4(), }

        let push = await itemmod.pushnew(reqj);
        res.json(push);
    }
    catch (rr) {
        res.json(rr);
    }
});


router.post('/registernew', async (req, res) => {
    try {
        const reqj = { unqId:uuidv4(),username: req.body.username, name: req.body.name, password: req.body.password, email: req.body.email }
console.log(reqj);
        let push = await itemmod.registerNewUser(reqj);
        res.json(push);
    }
    catch (rr) {
        res.statusCode=rr.status||500;
        res.json(rr);
    }
});

router.post('/login',async(req,res)=>{
    try {
        const reqj = {username: req.body.username,password: req.body.password }

        let push = await itemmod.loginCheck(reqj);
        res.json(push);
    } catch (error) {
        res.statusCode=error.status||500;
        res.json(error)
    }
})

router.get("/getDetails/:username",async(req,res)=>{
    try {
        // const reqj = {username: req.body.username,password: req.body.password }
        let username= req.params.username;
        let push = await itemmod.getUserDetails(username);
        res.json(push);
    } catch (error) {
        res.statusCode=error.status||500;
        res.json(error);
    }
})

router.post('/putnew', async  (req, res)=> {
    try {
        let body = req.body;
        let push = await itemmod.putnew(body);
        res.json(push);
    }
    catch (rr) {
        res.json(rr);
    }
});

router.get('/fetchevery',  async  (req, res)=> {
    try {
        let push = await itemmod.fetchEvery();
        console.log(push);
        res.json(push);
    }
    catch (rr) {
        res.json(rr);
    }
});

router.post('/popall/:item', async (req, res) => {
    try {

        let push = await itemmod.popAll(req.params.item);
        res.json(push);
    }
    catch (rr) {

        res.json(rr);
    }
})

module.exports = router;