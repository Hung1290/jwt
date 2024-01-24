import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password)
    try {
        await db.User.create({
            email: email,
            password: hashPassword,
            username: username
        })
    } catch (error) {
        console.log(error);
    }
}

const getUserList = async () => {
    let user = []
    try {
        user = await db.User.findAll()
        return user
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: {
                id
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (id) => {
    let user = {}
    try {
        user = await db.User.findOne({
            where: {
                id
            }
        })
        return user.get({ plain: true })
    } catch (error) {
        console.log(error);
    }
}

const updateUser = async (email, username, id) => {
    try {
        await db.User.update(
            { email, username },
            {
                where: {
                    id
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser, updateUser, getUserById
}