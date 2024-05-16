const mongoose = require('mongoose');


// let mongolink = "mongodb+srv://likhith27addela:Hl7RxLbzcI50uvAT@cluster0.2a7ytb2.mongodb.net/test";
//Hl7RxLbzcI50uvAT
const mongolink= `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;

const Items = mongoose.Schema({
    item_Id: { type: String },
    item_name: { type: String },
    item_quantity: { type: String },
    item_image: { type: String }
}, { collection: "Items" }
)
const users = mongoose.Schema({
    unqId: { type: String },
    username: { type: String },
    name: { type: String },
    password: { type: String },
    email:{type:String}
}, { collection: "users" }
)

let dbcon = {};

dbcon.ItemDb = async () => {
    try {
        let con = await mongoose.connect(mongolink, { useNewUrlParser: true, useUnifiedTopology: true })
        let coll = await con.model('Items', Items);

        return coll;
    }
    catch (rr) {

        throw rr;
    }
}
dbcon.usersDb = async () => {
    try {
        let con = await mongoose.connect(mongolink, { useNewUrlParser: true, useUnifiedTopology: true })
        let coll = await con.model('users', users);

        return coll;
    }
    catch (rr) {

        throw rr;
    }
}
module.exports = dbcon;