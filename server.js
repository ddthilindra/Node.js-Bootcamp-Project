const http = require('http');

const todos = [
  { id: 1, text: 'Todo one' },
  { id: 2, text: 'Todo two' },
  { id: 3, text: 'Todo three' },
];
const server = http.createServer((req, res) => {
  //   res.setHeader('Content-Type', 'text/html');
  //   res.write('<h1>Hello</h1>');
  //   res.write('<h2>Hello again</h2>');
  //   res.end();

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powerd-By', 'Node.js');

  res.end(
    JSON.stringify({
        success:true,
        data:todos
    })
  );
});
const PORT = 5000;

server.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));
