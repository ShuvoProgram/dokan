import { Server } from 'http';
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

process.on('uncaughtException', error => {
  console.error(error)
  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.info(' Database connection successful')

    app.listen(config.port, () => {
      console.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    console.error('Database connection error', error)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main();

process.on('SIGTERM', () => {
  console.info('SIGTERM is received')
  if (server) {
    server.close()
  }
});