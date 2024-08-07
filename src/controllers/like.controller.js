const Clothes = require('../models/clothes');
const User = require('../models/user'); 
const Like = require('../models/like'); 
const Sequelize = require('sequelize'); 

const likeToClothes = async (req, res) => {
    const { user_id, clothes_id } = req.body;
  
    try {
      const existingLike = await Like.findOne({
        where: { user_id, clothes_id },
      });
  
      if (existingLike) {
        return res.status(400).json({ error: 'Bu mahsulotni allaqachon yoqtirganiz' });
      }
  
      const like = await Like.create({ user_id, clothes_id });
  
      return res.status(201).json({ message: 'Mahsulotga like berildi', like });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Like berishda xatolik yuz berdi' });
    }
  };
  
  const unsubscribeLike = async (req, res) => {
    const { user_id, clothes_id } = req.body;
  
    try {
      const existingLike = await Like.findOne({
        where: { user_id, clothes_id },
      });
  
      if (!existingLike) {
        return res.status(400).json({ error: 'Bu mahsulotga like bermaganiz' });
      }
  
      await existingLike.destroy();
  
      return res.status(200).json({ message: 'Like o\'chirildi' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Like o\'chirishda xatolik yuz berdi' });
    }
  };
  
const getLikeClothes = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const pageSize = 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const startIndex = (page - 1) * pageSize;

    try {
        const { rows: like, count } = await Like.findAndCountAll({
            where: [ {user_id: userId, clothes_id: { [Sequelize.Op.not]: null }} ],
            include: [{ model: Clothes }],
            limit: pageSize,
            offset: startIndex
        });

        const clothes = like.map(like => like.Clothe); //////////////////////

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
    likeToClothes,
    getLikeClothes,
    unsubscribeLike
};
