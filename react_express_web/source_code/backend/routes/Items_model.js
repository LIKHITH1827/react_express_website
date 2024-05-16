const database = require('../db')

let model = {};

model.pushnew = async function(body) 
{
    let itemsmod = await database.ItemDb();
    let resp = await itemsmod.create(body);
    return resp;
}

model.registerNewUser=async(obj)=>{

    let umod = await database.usersDb();
    let uexsts = await umod.find({username:obj.username});
    console.log(uexsts);
    if(uexsts.length>0){
        let err = new Error("User exists");
        err.status=403;
        throw err;
    }
    else{
        let resp = await umod.create(obj);
        return resp;
    }

}

model.loginCheck=async(obj)=>{
    let umod = await database.usersDb();
 let res= await umod.find({username:obj.username,password:obj.password})   
 if(res.length>0){
    return res;

 }
 else{
    let err = new Error("User not found");
    err.status=404;
    throw err;
 }   
}

model.getUserDetails=async(username)=>{
    let umod = await database.usersDb();
    let details = await umod.find({username:username});
    if( details.length>0){
        return details
    }
    else{
        let err = new Error("User not found");
        err.status=404;
        throw err;
    }
}


model.putnew = async function(body)
 {
    try{
        console.log(body);
    let itemsmod = await database.ItemDb();
    let resp = await itemsmod.updateOne({ item_Id: body.item_Id }, { item_name: body.item_name, item_image: body.item_image, item_quantity: body.item_quantity });
    return resp
    }
    catch(e){
        console.log(e);
        return e;
    }
}

model.fetchEvery =async function()
{
    let itemsmod = await database.ItemDb();
    let resp = await itemsmod.find({});
    console.log(resp);
    return resp;
}

model.popAll=async function(itemIdval)
{
    let itemsmod = await database.ItemDb();
    let resp = await itemsmod.deleteOne({item_Id:itemIdval});
    return resp;
}

module.exports = model;