const { matchedData } = require('express-validator');
const { encrypt, compare } = require('../utils/handlePassword');
const { usersModel } = require('../models/index.models');
const { tokenSign } = require('../utils/handleJwt');
const { handleHttpError } = require('../utils/handleError');

/**
 * Controller to do user register
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {

  try {
    req = matchedData(req);
    const passwordHash = await encrypt(req.password)
    const body = { ...req, password: passwordHash };

    const dataUser = await usersModel.create(body);
    dataUser.set('password', undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser
    }

    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error al Registrar');
  }

}

/**
 * Controller to do user login
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel.findOne({ email: req.email })
      .select('password name role email');

    if (!user) {
      handleHttpError(res, 'Usuario no existe', 404);
      return;
    }

    const hashPassword = user.password;
    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleHttpError(res, 'Contraseña invalida', 401);
      return;
    }

    user.set('password', undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user
    }

    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error al Logear');
  }
}

module.exports = { registerCtrl, loginCtrl };