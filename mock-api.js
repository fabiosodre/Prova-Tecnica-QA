
const http = require('http');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (
    req.method === 'GET' &&
    url.pathname === '/api/v1/produtos/10/estoque'
  ) {
    const cor = url.searchParams.get('cor');
    const tamanho = url.searchParams.get('tamanho');

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
      produto_id: 10,
      cor: cor,
      tamanho: tamanho,
      quantidade_disponivel: 10
    }));

    return;
  }

  res.writeHead(404, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify({
    mensagem: 'Endpoint não encontrado'
  }));
});

server.listen(3000, () => {
  console.log('API mock disponível em http://localhost:3000');
});
