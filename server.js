import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';

const server = http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let filePath = path.join(process.cwd(), 'public', pathname === '/' ? 'html/index.html' : pathname);
    let extname = path.extname(filePath);
    let contentType;
    console.log(filePath);
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.html':
            contentType = 'text/html';
            break;
        default:
            contentType = 'text/plain';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));