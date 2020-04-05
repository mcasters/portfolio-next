import fs, { createWriteStream } from 'fs';
import isAuthenticated from '../../data/lib/authUtils';

const tempImage = async (req, res) => {
  if (!(await isAuthenticated(req)))
    throw new Error("Erreur d'authentification");

  const tempPath = `${process.env.PHOTOS_PATH}/tmp`;
  const filename = req.headers['content-filename'];
  const path = `${tempPath}/${filename}`;

  switch (req.method) {
    case 'POST':
      const writeStream = createWriteStream(`${path}`);
      req.pipe(writeStream);

      req.on('end', function() {
        res.statusCode = 200;
        res.end();
      });

      writeStream.on('error', function(err) {
        console.log(err);
        writeStream.end();
        res.statusCode = 400;
        res.message("Erreur à l'écriture du fichier temporaire");
      });
      break;

    case 'DELETE':
      if (fs.existsSync(path)) {
        fs.unlinkSync(`${path}`);
        res.statusCode = 200;
        res.end();
      } else {
        res.statusCode = 400;
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

export default tempImage;
