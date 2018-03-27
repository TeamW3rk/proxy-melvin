const express = require('express')
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const axios = require('axios');
const mainHTML = require('./templates/main_HTML');
const downloadBundles = require('./helpers/download_bundles');
const requireBundles = require('./helpers/require_bundles');
const renderComponents = require('./helpers/render_components');
let components;

app.get('/r/:id', (req, res) => {
  axios.get(`http://localhost:1127/r/${req.params.id}/about`)
    renderComponents(req.params.id, components)
      .then((renderedComponents) => {
        res.send(mainHTML(renderedComponents));
      });
});

downloadBundles().then(() => {
  components = requireBundles();
  app.listen(port, () => {
    console.log(`server running at: http://localhost:${port}`)
  });
});


