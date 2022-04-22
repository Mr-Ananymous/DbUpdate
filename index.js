const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require('mongoose');
const bp = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://admin-dinesh:dineshv%406028@cluster0.muixm.mongodb.net/samhitaDB", {
    useUnifiedTopology: true,
    //useCreateIndex: true,
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



const Schema = mongoose.Schema;
const userSchema = Schema({
    userid : {type: Number, default:null},
    email: {type: String, default:null},
    phone: {type: String, default:null},
    name:{type:String,default:null},
    college: {type: String, default:null},
    status:{type:Number,default:false},
    workshopstatus:{type:Number,default:0},
    password: {type: String,default:null},
    dept:{type:String,default:null},
    year:{type:Number,default:null},
    txnid:{type:String,default:null}
  
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
    
});
const User = mongoose.model("Event_db", userSchema);


const wSchema = new Schema({
  userid : {type: Number, default:null},
  email: {type: String, default:null},
  phone: {type: String, default:null},
  name:{type:String,default:null},
  tickets:{type:Number,default:0},
  status:{type:String,default:false},
  txnid:{type:[String],default:[]}

}, {
  timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
  },
  
});

const ml = mongoose.model('ML_db', wSchema);
const ui = mongoose.model('UI_db', wSchema);
const cloud = mongoose.model('cloud_db', wSchema);
const block = mongoose.model('blockchain_db', wSchema);
const ethical = mongoose.model('ethical_db', wSchema);

/*
const GroupSchema = new mongoose.Schema({
  leaderName: String,
  leaderReg: String,
  name1: String,
  regno1: String,
  name2: String,
  regno2: String,
  name3: String,
  regno3: String,
  dept: String,
  phone: String,
  email: String
});
const Gaming = mongoose.model("Gaming", GroupSchema);

Gaming.findOneAndUpdate({leaderReg:"2018506100" }, 
  {name1:"Nithish Guhan"}, null, function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Success");
  }
});
*/

app.get('/', (req, res) => {
  res.render("home");
});

app.post("/update", (req, res) => {
  var id = req.body.uid;
  var ticket = req.body.ticket;
  var title = req.body.title;
  let info;
  console.log(id);
  console.log(ticket);
  console.log(title);
  if(ticket === "yes")
  {
    User.findOneAndUpdate({userid:parseInt(id) }, 
  {status:1, workshopstatus:1}, null, function (err, docs) {
  if (err){
      console.log(err);
      //res.json({message: "User not found"});
  }
  else{
      console.log("Ticket Status updated Successfully");
      //alert("Ticket Status updated Successfully");
      //res.json({message: "Ticket Status Updated"});
  }
});
  }
  if(title === "Cloud")
  {
    User.find({ userid:parseInt(id)}, function (err, docs) {
      if (err){
          console.log(err);
      }
      else{
          info = docs;
          console.log("Success Info");
      }
      console.log(info[0].name);

      const u1 = new cloud({
        userid: info[0].userid,
        email: info[0].email,
        phone: info[0].phone,
        name: info[0].name,
        tickets: 1,
        status: "1",
        txnid: []
      });
      u1.save();
      console.log("User added to cloud db");
      //alert("User added to cloud db");
  });
}

else if(title === "ML")
{
  User.find({ userid:parseInt(id)}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        info = docs;
        console.log("Success Info");
    }
    console.log(info[0].name);

    const u2 = new ml({
      userid: info[0].userid,
      email: info[0].email,
      phone: info[0].phone,
      name: info[0].name,
      tickets: 1,
      status: "1",
      txnid: []
    });
    u2.save();
    console.log("User added to ML db");
    //res.json({wMessage:"User added to ML db"});
});
}

else if(title === "UI")
{
  User.find({ userid:parseInt(id)}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        info = docs;
        console.log("Success Info");
    }
    console.log(info[0].name);

    const u3 = new ui({
      userid: info[0].userid,
      email: info[0].email,
      phone: info[0].phone,
      name: info[0].name,
      tickets: 1,
      status: "1",
      txnid: []
    });
    u3.save();
    console.log("User added to UI db");
    //alert("User added to UI db");
});
}

else if(title === "Block")
{
  User.find({ userid:parseInt(id)}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        info = docs;
        console.log("Success Info");
    }
    console.log(info[0].name);

    const u4 = new block({
      userid: info[0].userid,
      email: info[0].email,
      phone: info[0].phone,
      name: info[0].name,
      tickets: 1,
      status: "1",
      txnid: []
    });
    u4.save();
    console.log("User added to Block Chain db");
    //alert("User added to Block Chain db");
});
}

else if(title === "Ethical")
{
  User.find({ userid:parseInt(id)}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        info = docs;
        console.log("Success Info");
    }
    console.log(info[0].name);

    const u5 = new ethical({
      userid: info[0].userid,
      email: info[0].email,
      phone: info[0].phone,
      name: info[0].name,
      tickets: 1,
      status: "1",
      txnid: []
    });
    u5.save();
    console.log("User added to Ethical Hacking db");
    //alert("User added to Ethical Hacking db");
});
}
  res.redirect("/");
  //res.json({message: "Ticket Status Updated"});
});


app.post("/details", (req, res) => {
  //console.log("Details working");
  let det, temp;
  var id = req.body.uid;
  User.find({ userid:parseInt(id)}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
        det = docs;
        //console.log(docs);
    }
    res.render("details", { user: det});
    
  });

  
  //console.log(temp);
  //res.render("details", { user: det, machine: m[0].status, bchain: b[0].status, uix: u[0].status, hack: e[0].status, aws: c[0].status});
});



/*app.post("/set", (req, res) => {
  //console.log("Details working");
  //let det;
  var id = req.body.uid;
  User.updateMany({status:1}, {workshopstatus:1}, function(err, docs){
    if(err){
      console.log(err);
    }
    else{
      console.log("status = workshopstatus set successfully");
    }
  });
  res.redirect("/");
});
*/

app.listen(process.env.PORT || 3001, function () {
  console.log("server has been started successfully");
});
