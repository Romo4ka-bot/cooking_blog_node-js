const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const hbs = require('hbs');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const varMiddleware = require('./middleware/variables');
const ownerMiddleware = require('./middleware/owner');
const csrf = require('csurf');
const flash = require('connect-flash');
const config = require('./config/config');

const homeRouter = require('./routes/homeRouter');
const creatorDishRouter = require('./routes/creatorDishRouter');
const loginRouter = require('./routes/loginRouter');
const signUpRouter = require('./routes/signUpRouter');
const aboutUsRouter = require('./routes/aboutUsRouter');
const singleDishRouter = require('./routes/singleDishRouter');
const logoutRouter = require('./routes/logoutRouter');
const donationRouter = require('./routes/donationRouter');

const app = express();

const store = new MongoStore({
    collection: 'session',
    uri: config.MONGODB_URI
});

hbs.registerPartials(__dirname + '/views/partials');

// view engine setup
app.engine('hbs', exphbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 24 * 60 * 60 * 365 //вот в этом объекте задается время жизни сессии
    }
}));

app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(ownerMiddleware);

app.use('/', homeRouter);
app.use('/create', creatorDishRouter);
app.use('/login', loginRouter);
app.use('/signUp', signUpRouter);
app.use('/about', aboutUsRouter);
app.use('/dish', singleDishRouter);
app.use('/logout', logoutRouter);
app.use('/donation', donationRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.contentType('text/html; charset=UTF-8');
    console.log(err);
    res.render('error', {
        isHeader: true
    });
});

// подключение
try {
    mongoose.connect(config.MONGODB_URI,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
} catch (e) {
    console.log(e);
}
module.exports = app;