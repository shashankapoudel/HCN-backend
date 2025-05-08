const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cors = require('cors');
const http = require('http');


dotenv.config();

connectDB();


const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "GET", "PUT", "DELETE", "UPDATE"]
}));

app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/product', require('./src/routes/productRoutes'));
app.use('/api/cart', require('./src/routes/cartRoutes'));
app.use('/api/orders', require('./src/routes/orderRoutes'));
app.use('/api/faq', require('./src/routes/faqRoutes'));
app.use('/api/blog', require('./src/routes/blogRoutes'));
app.use('/api/newsletter', require('./src/routes/newsLetterRoutes'));
app.use('/api/contact', require('./src/routes/contactRoutes'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


