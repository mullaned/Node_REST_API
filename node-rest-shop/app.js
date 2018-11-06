const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Our Routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//Morgan Body Parser
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//CORS ERROR Handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Orign', '*');
    res.header('Access-Contol-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// Our routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


//Error handling
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.staus = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;