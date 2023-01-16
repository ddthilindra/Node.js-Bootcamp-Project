const http = require('http');

const todos = [
  { id: 1, text: 'Todo one' },
  { id: 2, text: 'Todo two' },
  { id: 3, text: 'Todo three' },
];
const server = http.createServer((req, res) => {
  /*
    
    1.xx INFORMATION

    2.xx SUCCESS
    200     | Success
    201     | Created
    204     | No Content
    
    3.xx REDIRECTION
    304     | Not Modified
    
    4.xx CLIENT ERROR
    400     | Bad Request
    401     | Unauthorized
    404     | Not Found

    5.xx SERVER ERROR
    500     | Internal Server Error

  */

  //   res.statusCode = 404;
  //   res.setHeader('Content-Type', 'application/json');
  //   res.setHeader('X-Powerd-By', 'Node.js');

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Powerd-By': 'Node.js',
  });

  res.end(
    JSON.stringify({
      success: true,
      data: todos,
    })
  );
});
const PORT = 5000;

server.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));
