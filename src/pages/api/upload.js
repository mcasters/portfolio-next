import { createWriteStream } from 'fs';

export default async (req, res) => {
  const tempPath = `${process.env.PHOTOS_PATH}/tmp`;
  const filename = req.headers['content-filename'];

  const writeStream = createWriteStream(`${tempPath}/${filename}`);
  req.pipe(writeStream);

  req.on('end', function () {
    res.statusCode = 200;
    res.end();
  });

  writeStream.on('error', function (err) {
    console.log(err);
    writeStream.end();
    throw new Error("Erreur à l'écriture du fichier temporaire");
  });
};

// for the pipe to work, we need to disable "bodyParser"
export const config = {
  api: {
    bodyParser: false,
  },
};
