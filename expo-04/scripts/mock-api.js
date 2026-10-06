const http = require('node:http');
const crypto = require('node:crypto');

const PORT = process.env.PORT || 3000;
const users = [];
const tokens = new Map();

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function publicUser({ password, ...user }) {
  return user;
}

function createSession(res, status, user) {
  const token = crypto.randomUUID();
  tokens.set(token, user.id);
  send(res, status, { token, user: publicUser(user) });
}

http
  .createServer((req, res) => {
    let raw = '';
    req.on('data', (chunk) => (raw += chunk));
    req.on('end', () => {
      const body = raw ? JSON.parse(raw) : {};
      console.log(req.method, req.url);

      if (req.method === 'POST' && req.url === '/auth/register') {
        const { name, email, password } = body;
        if (!name || !email || !password) return send(res, 400, { message: 'Dados incompletos.' });
        if (users.some((u) => u.email === email)) {
          return send(res, 409, { message: 'Já existe uma conta com este e-mail.' });
        }
        const user = { id: users.length + 1, name, email, password, createdAt: new Date().toISOString() };
        users.push(user);
        return createSession(res, 201, user);
      }

      if (req.method === 'POST' && req.url === '/auth/login') {
        const user = users.find((u) => u.email === body.email && u.password === body.password);
        if (!user) return send(res, 401, { message: 'E-mail ou senha incorretos.' });
        return createSession(res, 200, user);
      }

      if (req.method === 'GET' && req.url === '/auth/me') {
        const token = (req.headers.authorization || '').replace('Bearer ', '');
        const user = users.find((u) => u.id === tokens.get(token));
        if (!user) return send(res, 401, { message: 'Sessão inválida.' });
        return send(res, 200, publicUser(user));
      }

      send(res, 404, { message: 'Rota não encontrada.' });
    });
  })
  .listen(PORT, '0.0.0.0', () => console.log(`Mock API em http://localhost:${PORT}`));
