//dependencies
const { query } = require('express');
const express = require('express');
const PORT = process.env.PORT || 3002;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//listening
app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}/`);
});