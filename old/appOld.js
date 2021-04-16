// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const exphbs = require('express-handlebars');
// const hbs = require("hbs");
// const multer  = require("multer");
// const upload = multer({dest:"uploads"});
// const storageConfig = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//         const name = file.originalname;
//         const pos = name.find('.');
//         cb(null, name(0, pos) + "-" + Date.now() + name(pos))
//     }
// });
//
// const fileFilter = (req, file, cb) => {
//
//     if(file.mimetype === "image/png" ||
//         file.mimetype === "image/jpg"||
//         file.mimetype === "image/jpeg"){
//         cb(null, true);
//     }
//     else{
//         cb(null, false);
//     }
// };
//
// const homeRouter = require('./routes/homeRouter');
// const creatorRecipeRouter = require('./routes/creatorRecipeRouter');
//
// const app = express();
//
// hbs.registerPartials(__dirname + "/views/partial");
//
// // view engine setup
// app.engine('hbs', exphbs({
//     layoutsDir: "views/layouts",
//     defaultLayout: 'main',
//     extname: 'hbs'
// }));
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(multer({storage: storageConfig, fileFilter: fileFilter}).single("photo"));
//
// app.use('/', homeRouter);
// app.use('/create', creatorRecipeRouter);
//
// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });
//
// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });
//
//
// const user = 'postgres';
// const host = 'localhost';
// const database = 'culinary_blog';
// const password = '111';
//
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(database, user, password, {
//     dialect: "postgres",
//     timezone: '+03:00'
// });
//
// const User = sequelize.define("user", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     login: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     surname: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     age: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     }
// });
//
// const Dish = sequelize.define("dish", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     photo: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     description: {
//         type: Sequelize.STRING(400),
//         allowNull: false
//     },
//     recipe: {
//         type: Sequelize.STRING(1000)
//     }
// });
//
// const Ingredient = sequelize.define("ingredient", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: Sequelize.STRING
//     }
// });
//
// const Comment = sequelize.define("comment", {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     content: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     date: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });
//
// User.hasMany(Dish, {onUpdate: "cascade"});
// Dish.hasMany(Ingredient, {onDelete: "cascade", onUpdate: "cascade"});
// User.hasMany(Comment);
//
//
// sequelize.sync().then(result => {
//     console.log(result);
// }).catch(err => console.log(err));
//
// module.exports = {
//     app: app
// };