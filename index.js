'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors');

module.exports = (options) => {

  let app = express()

  app.use(graphqlHTTP(options))
  app.use(cors());

  let server = awsServerlessExpress.createServer(app)

  return {
    handler: (event, context) => {
      return awsServerlessExpress.proxy(server, event, context)
    }, close: () => {
      server.close()
    }
  }
}
