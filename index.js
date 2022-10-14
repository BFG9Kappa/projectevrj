const express = require("express");
const app = express();
const port = 5556;

app.get('/', function(req, res) {
  
  res.send('Prova!');
});
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});