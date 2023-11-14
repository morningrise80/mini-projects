const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// Async function for handling HTTP requests
const requestHandler = async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/api/users') {
      // Read user data from a file using Promises and async/await
      const data = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } else if (req.method === 'GET' && req.url === '/api/posts') {
      // Example of another endpoint
      const postData = JSON.stringify([{ title: 'Post 1' }, { title: 'Post 2' }]);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(postData);
    } else if (req.method === 'POST' && req.url === '/api/users') {
      // Example of handling a POST request
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', async () => {
        // Assuming the request body contains JSON data
        const userData = JSON.parse(body);
        // Process the data (save to file, database, etc.)
        // For simplicity, we'll just echo the received data in this example
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userData));
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};

// Async function to create an HTTP server
const createServerAsync = async () => {
  return new Promise((resolve) => {
    const server = http.createServer(requestHandler);

    // Start the server on port 3000
    server.listen(3000, () => {
      console.log('Server running on <http://localhost:3000/>');
      resolve(server);
    });
  });
};

// Use async/await to create and start the server
const startServer = async () => {
  try {
    const server = await createServerAsync();

    // Example interaction: Make a request to /api/users
    http.get('http://localhost:3000/api/users', (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        console.log('Received data from /api/users:', data);
      });
    });

    // Example interaction: Make a POST request to /api/users
    const postData = JSON.stringify({ name: 'John Doe', age: 30 });
    const postOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
      },
    };

    const postReq = http.request(postOptions, (postRes) => {
      let responseData = '';

      postRes.on('data', (chunk) => {
        responseData += chunk;
      });

      postRes.on('end', () => {
        console.log('Received response from POST /api/users:', responseData);
      });
    });

    postReq.write(postData);
    postReq.end();
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

// Call the async function to start the server
startServer();
