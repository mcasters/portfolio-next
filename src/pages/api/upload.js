import formidable from 'formidable';
import { mkdir, stat } from 'fs/promises';
import { rename } from 'fs';

import { isAuth } from '../../components/utils/authUtils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({
      data: null,
      error: 'Method Not Allowed',
    });
  }

  if (!(await isAuth(req))) {
    res.status(405).json({
      data: null,
      error: "Erreur d'authentification",
    });
  }

  // eslint-disable-next-line no-undef
  const uploadDir = `${process.env.PHOTOS_PATH}/tmp`;

  try {
    await stat(uploadDir);
  } catch (e) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e);
      return;
    }
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
  });

  form.on('file', function (field, file) {
    rename(file.filepath, `${uploadDir}/${field}`, (err) => {
      if (err) throw err;
    });
  });

  const { FormidableError } = formidable.errors;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      if (err instanceof FormidableError) {
        res
          .status(err.httpCode || 400)
          .json({ data: null, error: err.message });
      } else {
        res.status(500).json({ data: null, error: 'Internal Server Error' });
      }
    }

    res.status(200).json({
      data: {
        files,
      },
      error: null,
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
