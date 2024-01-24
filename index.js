const express = require('express');
const app = express();
const routes = require('./src/routers/router');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


// Swagger View
app.use('/api-docs', swaggerUi.serve, function(req, res) {
    swaggerDocument.host = req.get('host')
    swaggerDocument.schemes = [req.protocol]
    swaggerUi.setup(swaggerDocument)(req, res)
})

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

// Add more routes as needed.
app.use('/', routes);


const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})