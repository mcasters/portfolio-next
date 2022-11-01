import formidable from 'formidable';
import { mkdir, stat } from 'fs/promises';

import CONSTANT from '../../constants/itemConstant';
import { isAuth } from '../../utils/auth';

const FormidableError = formidable.errors.FormidableError;

const parseForm = async (req) => {
  return await new Promise(async (resolve, reject) => {
    const uploadDir = `${process.env.PHOTOS_PATH}/tmp`;

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === 'ENOENT') {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    const form = formidable({
      maxFiles: 4,
      uploadDir,
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

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

  try {
    const { fields, files } = await parseForm(req);
    const file = files[CONSTANT.UPLOAD_NAME];

    let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;

    res.status(200).json({
      data: {
        url,
      },
      error: null,
    });
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ data: null, error: 'Internal Server Error' });
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};