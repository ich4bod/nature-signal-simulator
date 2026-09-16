const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.css': 'text/css', '.js': 'application/javascript', '.html': 'text/html'};
http.createServer((req, res) => {
  if (req.url === '/healthz') return res.end('ok\n');
  const name = req.url === '/' ? 'index.html' : path.basename(req.url);
  const file = path.join(root, name);
  if (!fs.existsSync(file)) return res.writeHead(404).end('not found\n');
  res.writeHead(200, {'Content-Type': `${types[path.extname(file)] || 'text/plain'}; charset=utf-8`});
  fs.createReadStream(file).pipe(res);
}).listen(3000, '0.0.0.0');
