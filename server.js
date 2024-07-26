import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rootPath = path.join(path.dirname(fileURLToPath(import.meta.url)));

const mimeTypes = new Map([
    ['.js', 'text/javascript'],
    ['.html', 'text/html'],
    ['.css', 'text/css'],
    ['.jpg', 'image/jpeg'],
    ['.png', 'image/png'],
    ['.jpeg', 'image/jpeg'],
    ['.webp', 'image/webp'],
]);

const server = http.createServer((req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const pathname = url.pathname;
    let filePath;
    let contentType;

    if (pathname === '/') {
        filePath = path.join(rootPath, 'public/html', 'index.html');
        contentType = mimeTypes.get('.html');
    } else {
        filePath = path.join(rootPath, 'public', pathname);
        const extension = path.extname(pathname);
        contentType = mimeTypes.get(extension);
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end(`File not found: ${filePath}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));