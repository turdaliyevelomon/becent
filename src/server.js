//src/server.js

const express = require('express');
const sequelize = require('./config/database');
const clothesRoutes = require('./routes/clothes.routes');
const authRoutes = require('./routes/auth.routes');
const usersShopRoutes = require('./routes/usersShop.routes');
const likeRoutes = require('./routes/like.routes');
const cartRoutes = require('./routes/cart.routes');
const path = require('path');
const PORT = process.env.PORT || 3030;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
});

app.use(clothesRoutes);
app.use(authRoutes);
app.use(likeRoutes);
app.use(cartRoutes); 
app.use(usersShopRoutes);
app.use("/uploads/:filename", (req, res) => {
    res.sendFile(path.join(process.cwd(), "uploads", req.params.filename))
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
