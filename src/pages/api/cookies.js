import { setCookie } from '../../utils/auth';

export default function handler(req, res) {
  setCookie(res, 'Next.js', 'api-middleware!');
  res.end(res.getHeader('Set-Cookie'));
}

export const config = {
  api: {
    bodyParser: false,
  },
};