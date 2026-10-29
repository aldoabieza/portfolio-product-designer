import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'asset-upload-middleware',
        configureServer(server) {
          // Serve static assets directly from public/assets with video range support
          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.startsWith('/assets/')) {
              const cleanUrl = decodeURIComponent(req.url.replace(/^\//, '').split('?')[0]);
              const filePath = path.resolve(__dirname, 'public', cleanUrl);
              if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                const ext = path.extname(filePath).toLowerCase();
                const mimeTypes: Record<string, string> = {
                  '.mp4': 'video/mp4',
                  '.webm': 'video/webm',
                  '.mov': 'video/quicktime',
                  '.png': 'image/png',
                  '.jpg': 'image/jpeg',
                  '.jpeg': 'image/jpeg',
                  '.webp': 'image/webp',
                  '.svg': 'image/svg+xml'
                };
                const contentType = mimeTypes[ext] || 'application/octet-stream';
                const stat = fs.statSync(filePath);
                const fileSize = stat.size;
                const range = req.headers.range;

                if (range && (ext === '.mp4' || ext === '.webm' || ext === '.mov')) {
                  const parts = range.replace(/bytes=/, '').split('-');
                  const start = parseInt(parts[0], 10);
                  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                  const chunksize = end - start + 1;
                  const file = fs.createReadStream(filePath, { start, end });
                  const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': contentType,
                  };
                  res.writeHead(206, head);
                  file.pipe(res);
                  return;
                }

                res.writeHead(200, {
                  'Content-Length': fileSize,
                  'Content-Type': contentType,
                  'Accept-Ranges': 'bytes',
                  'Cache-Control': 'no-cache'
                });
                fs.createReadStream(filePath).pipe(res);
                return;
              }
            }
            next();
          });

          server.middlewares.use('/api/upload-asset', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const { filename, dataBase64 } = JSON.parse(body);
                  if (!filename || !dataBase64) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Missing filename or dataBase64' }));
                    return;
                  }
                  const safeFilename = path.basename(filename);
                  const targetDirPublic = path.resolve(__dirname, 'public/assets/projects/doku');
                  const targetDirDist = path.resolve(__dirname, 'dist/assets/projects/doku');

                  if (!fs.existsSync(targetDirPublic)) {
                    fs.mkdirSync(targetDirPublic, { recursive: true });
                  }
                  if (!fs.existsSync(targetDirDist)) {
                    fs.mkdirSync(targetDirDist, { recursive: true });
                  }

                  const buffer = Buffer.from(dataBase64.replace(/^data:[^;]+;base64,/, ''), 'base64');
                  fs.writeFileSync(path.join(targetDirPublic, safeFilename), buffer);
                  fs.writeFileSync(path.join(targetDirDist, safeFilename), buffer);

                  const assetPath = `/assets/projects/doku/${safeFilename}`;
                  const { isCover } = JSON.parse(body);
                  if (isCover) {
                    const pDataPath = path.resolve(__dirname, 'src/data/portfolioData.ts');
                    if (fs.existsSync(pDataPath)) {
                      let content = fs.readFileSync(pDataPath, 'utf8');
                      content = content.replace(/(id:\s*'doku'[\s\S]*?coverImage:\s*')([^']+)'/, `$1${assetPath}'`);
                      fs.writeFileSync(pDataPath, content, 'utf8');
                    }
                  }

                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true, path: assetPath }));
                } catch (err: any) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
            } else {
              res.statusCode = 405;
              res.end('Method Not Allowed');
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
