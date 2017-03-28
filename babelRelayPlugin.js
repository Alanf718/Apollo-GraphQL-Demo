var getBabelRelayPlugin = require('babel-relay-plugin');
var schemaData = require('./server/graphql/data/schema.json').data;
module.exports = getBabelRelayPlugin(schemaData);