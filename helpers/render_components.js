const axios = require('axios');
const React = require('react');
const ReactDom = require('react-dom/server');
const bundleInfos = require('../helpers/bundles.js');

const renderComponents = (id, components) => {
  const renderedComponents = bundleInfos.map((info) => {
    return axios.get(`${info.url}r/${id}/${info.endpoint}`)
      .then((response) => {
        const props = {};
        props[info.props.data] = response.data;
        props[info.props.id] = id;
        return [info.service, ReactDom.renderToString(React.createElement(components[info.service], props)), props];
      })
      .catch(() => console.log(`render component ${info.service} failed`));
  });
  return Promise.all(renderedComponents);
};

module.exports = renderComponents;