var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const userRoutes = require("./routes/user");
var sessions = require('express-session');
const cookieParser = require("cookie-parser");
const path = require("path");
const Handlebars = require('handlebars');
const {engine}  = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

var app = express();


const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine('handlebars', engine({defaultLayout: 'main',handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.use("/", productRoutes);

app.use("/categories", categoryRoutes);

app.use("/users", userRoutes);

app.listen(3000,()=> {
	console.log("Server Connect")
})

mongoose.connect('mongodb://127.0.0.1:27017/myApp').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});


