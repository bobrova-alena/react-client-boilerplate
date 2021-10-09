import fs from 'fs';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import MobileDetect from 'mobile-detect';
import appPath from '../../utils/path';

const app = express();
const port = 3000;
const proxy = process.env.API_URL ? process.env.API_URL : 'http://localhost:8080';

app.use(bodyParser.json());
app.use(express.static(appPath.clientDist));

app.use('/api', createProxyMiddleware({ target: proxy, changeOrigin: true }));

app.get('/', getHtml);
app.get('/home', getHtml);
app.get('/second', getHtml);

async function getHtml(req: Request, res: Response): Promise<void> {
  const mobileDetect = new MobileDetect(
    req.headers['user-agent'] ??
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  );
  const isMobile = !!mobileDetect.mobile();
  const htmlPath = isMobile ? appPath.mobileClientHtml : appPath.webClientHtml;

  fs.readFile(htmlPath, 'utf8', async (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('The html file not found!');
    }

    return res.status(200).send(data);
  });
}

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
