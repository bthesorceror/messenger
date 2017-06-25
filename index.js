const server = require('./server')
const port = process.env.PORT || 4000

server.listen(port, () => {
  console.info(`Now listening on port ${port}`)
})
