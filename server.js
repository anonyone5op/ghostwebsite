const express = require('express');
const path = require('path');

// Load additional files
const sites = require('./database/sampledata.json');

// Create an Express app
const app = express();

// Configure Express to use EJS as the template engine
app.set('views', `${__dirname}/public/views`);
app.set('view engine', 'ejs');

// Define a function to find data by subdomain
const findData = (subdomain) => {
    return sites.find((e) => e.subdomain === subdomain);
};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to handle requests
app.get('/', (req, res) => {
    // Extract subdomain from the request
    const Csubdomain = req.subdomains.join('.');
    // Find data based on the subdomain
    const data = findData(Csubdomain);
    if(Csubdomain == ''){
        res.send('YOU ARE USING LOCALHOST')
        return
    }
    // Check if data is found
    if (data !== undefined) {
        // Render the 'Cdata' view with the data
        res.render('Cdata', { data });
    } else {
        // Set the response status to 404 and send a '404' message
        res.status(404).send('404');
    }
});

// Start the Express app on port 6969
app.listen(9091, () => {
    console.log('App started on port 6969');
});
