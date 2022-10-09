const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize= require("./util/database");

const errorController = require("./controllers/error");
const User = require('./models/user');
const Product = require('./models/product');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { userInfo } = require("os");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user ;               ////sequel object and not js object
        next();                         ////going to next middleware 
    })
    .catch(err=> console.log(err))
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User , {constraints:true , onDelete:'CASCADE'});
User.hasMany(Product)

sequelize
.sync()
// .sync({force: true})
.then(result=>{
    return User.findByPk(1);
    
})
.then((user)=>{
    if(!user){
        return User.create({name:"sam" , email:"asdf@qweer.com"});
    }
    return user; 
})
.then(user =>{
    console.log(user);
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})

// app.listen(3000);
