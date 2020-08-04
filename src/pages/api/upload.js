import fs, { createWriteStream } from 'fs';
import isAuthenticated from '../../data/lib/authUtils';

const upload = async (req, res) => {
  if (!(await isAuthenticated(req)))
    throw new Error("Erreur d'authentification");

  const tempPath = `${process.env.NEXT_PUBLIC_PHOTOS_PATH}/tmp`;
  const filename = req.headers['content-filename'];
  const path = `${tempPath}/${filename}`;

  switch (req.method) {
    case 'POST':
      const writeStream = createWriteStream(`${path}`);
      req.pipe(writeStream);

      req.on('end', function () {
        res.statusCode = 200;
        res.end();
      });

      writeStream.on('error', function () {
        writeStream.end();
        res.writeHead(500, 'Error on server');
        res.write('500: Error to write file ');
        res.end();
      });
      break;

    case 'DELETE':
      if (fs.existsSync(path)) {
        fs.unlinkSync(`${path}`);
        res.statusCode = 200;
        res.end();
      } else {
        res.writeHead(404, 'Not Found');
        res.write('404: File Not Found!');
        res.end();
      }
      break;

    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};

// for the pipe to work, we need to disable "bodyParser"
export const config = {
  api: {
    bodyParser: false,
  },
};

export default upload;
