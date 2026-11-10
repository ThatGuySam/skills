// Synthetic demo project: HTTP server entry point.
import { createServer } from 'node:http'
import { config } from './config.js'

createServer((request, response) => {
  if (request.url === '/webhooks/stripe' && !config.stripeWebhookSecret) {
    response.writeHead(503).end('Stripe webhooks are not configured')
    return
  }
  response.end('ok')
}).listen(config.port)
