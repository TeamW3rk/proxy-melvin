const axios = require('axios');
const path = require('path');
const fs = require('fs');
const bundleInfos = require('../helpers/bundles.js');

const promisifyOnEvent = (data) => {
  return new Promise((resolve, reject) => {
    data.on('end', () => {
      resolve();
    });
  }); 
}

const getBundle = (info, type, fileExtension = '.js') => {
  if(!info.fileName[type]) return Promise.resolve(); 
  return axios({
    url: info.url + info.fileName[type],
    method: 'get',
    responseType: 'stream',
  })
    .then((response) =>{
      const bundlePath = path.join(__dirname, `../public/bundles/${info.service}-${type}${fileExtension}`);
      const writeStream = fs.createWriteStream(bundlePath);
      response.data.pipe(writeStream);
      return promisifyOnEvent(response.data)
        .then(() => {
          console.log(`${info.fileName[type]} fetched from ${info.url}`);
        });
    })
    .catch(() => console.log(`failed to fetch ${info.fileName[type]} from ${info.url + info.fileName[type]}`));;
};

const downloadBundles = () => {
  const clientBundles = [];
  const serverBundles = [];
  let promises = bundleInfos.map(info => getBundle(info, 'server'));
  promises.concat(bundleInfos.map(info => getBundle(info, 'client')));
  promises.concat(bundleInfos.map(info => getBundle(info, 'styles', '.css')));
  return Promise.all(promises);
};


module.exports = downloadBundles;