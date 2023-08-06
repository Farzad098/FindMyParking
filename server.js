const express = require('express');
const app = express();


app.use(express.static(__dirname));

// Start server on port 3000
app.listen(3000, function() {
  console.log(`Server running at http://127.0.0.1:3000/`);
});