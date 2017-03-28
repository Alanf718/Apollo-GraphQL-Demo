const getBabelRelayPlugin = require('babel-relay-plugin');
const schemaData = require('./../../../server/graphql/data/schema.json');
module.exports = getBabelRelayPlugin(schemaData.data);