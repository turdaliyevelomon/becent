const Clothes = require('../models/clothes');
const User = require('../models/user'); 
const Cart = require('../models/cart'); 
const Sequelize = require('sequelize'); 

const cartToClothes = async (req, res) => {
    const { user_id, clothes_id } = req.body;
  
    try {
      
      const existingCart = await Cart.findOne({
        where: { user_id, clothes_id },
      });
  
      if (existingCart) {
        return res.status(400).json({ error: 'Bu mahsulotni allaqachon yoqtirganiz' });
      }
  
      const cart = await Cart.create({ user_id, clothes_id });
  
      return res.status(201).json({ message: 'Mahsulotga cart berildi', cart});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Cart berishda xatolik yuz berdi' });
    }
};
  
const unsubscribeCart = async (req, res) => {
    const { user_id, clothes_id } = req.body;
  
    try {
      const existingCart = await Cart.findOne({
        where: { user_id, clothes_id },
      });
  
      if (!existingCart) {
        return res.status(400).json({ error: 'Bu mahsulotga cart bermaganiz' });
      }
  
      await existingCart.destroy();
  
      return res.status(200).json({ message: 'Cart o\'chirildi' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Cart o\'chirishda xatolik yuz berdi' });
    }
};
  
const getCartClothes = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const pageSize = 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const startIndex = (page - 1) * pageSize;

    try {
        const { rows: cart, count } = await Cart.findAndCountAll({
            where: [ {user_id: userId, clothes_id: { [Sequelize.Op.not]: null }} ],
            include: [{ model: Clothes }],
            limit: pageSize,
            offset: startIndex
        });

        const clothes = cart.map(cart => cart.Clothe); //////////////////////

        const user = await User.findByPk(userId);
        if (user) {
            user.setDataValue('clothes', { total: count, clothes });
            return res.json({ user });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error fetching subscribed clothess' });
    }
};

module.exports = {
    cartToClothes,
    getCartClothes,
    unsubscribeCart,
};
