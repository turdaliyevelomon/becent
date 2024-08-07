// usersShop.controller.js
const Clothes = require('../models/clothes');
const User = require('../models/user'); 
const Sequelize = require('sequelize'); 
const UsersShop = require('../models/usersShop');

const createUserShop = async (req, res) => {
    const { user_id, clothes_id, number } = req.body;
    try {
        const userShop = await UsersShop.create({
            user_id,
            clothes_id,
            number,
        });
        return res.status(201).json(userShop);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'UsersShop yaratishda xatolik yuz berdi' });
    }
};

const deleteUserShop = async (req, res) => {
    const id = req.params.id;
    try {
        const userShop = await UsersShop.findByPk(id);
        if (!userShop) {
            return res.status(404).json({ error: 'UsersShop topilmadi' });
        }
        await userShop.destroy();
        return res.status(200).json({ message: 'UsersShop o\'chirildi' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'UsersShop o\'chirishda xatolik yuz berdi' });
    }
};

const getAllUserShops = async (req, res) => {
    try {
        const userShops = await UsersShop.findAll();
        return res.status(200).json(userShops);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'UsersShop ma\'lumotlarini olishda xatolik yuz berdi' });
    }
};

const getIdUserShops = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const usersShop = await UsersShop.findAll({
            where: { user_id: id, clothes_id: { [Sequelize.Op.not]: null } },
            include: [{ model: Clothes }]
        });

        const clothes = usersShop.map((usersShop) => {
            const channelData = usersShop.Clothe.toJSON();
            channelData.number = usersShop.number; 
            return channelData;
        });

        const user = await User.findByPk(id);
        if (user) {
            user.setDataValue('clothes', { total: clothes.length, clothes });
            return res.json({ user });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error fetching subscribed clothes' });
    }
};



module.exports = {
    createUserShop,
    deleteUserShop,
    getAllUserShops,
    getIdUserShops
};

