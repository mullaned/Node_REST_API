## RESTful API:

Representational State Transfer is used to transfer data.  

Stateless Backends with HTTP endpoints

HTTP requests to exchange data usually in JSON format


## Usage

run npm install.


## CORS Errors:
Cross-Origin Resource Sharing blocks access from non local servers.  Add CORS headers to avoid errors.

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Orign', '*');
    res.header('Access-Contol-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
});