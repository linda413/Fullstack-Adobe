const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors')
app.get('/', (req,res) => res.send('API Running'))

app.use(cors());

connectDB();

//init Middleware
app.use(express.json( {extended: false}));

app.use('/music', require('./routes/api/music'))
app.use('/users', require('./routes/api/users'))
app.use('/comments', require('./routes/api/comments'))

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))