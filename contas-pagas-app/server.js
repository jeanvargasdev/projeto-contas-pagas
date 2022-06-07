//Install express server
const express = require('express');
//const { dirname } = require('path');
//const path = require('path');
const app = express();

const appName = 'contas-pagas-app2';

const outputPath = `${__dirname}/dist/${appName}`;


// Serve only the static files form the dist directory
app.use(express.static(outputPath));

app.get('/*', (req, res) => {
  res.sendFile(`${outputPath}/index.html`);
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT);
