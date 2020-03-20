import express from 'express';

// Initializing the cors middleware
const expressMiddleware = express.use(
  '/images',
  express.static(path.resolve(process.env.PHOTOS_PATH)),
);

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req, res) {
  // Run the middleware
  // await runMiddleware(req, res, expressMiddleware);

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' });
}

export default handler;
