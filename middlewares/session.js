const { handleHttpError } = require('../utils/handleError');
const { verifyToken } = require('../utils/handleJwt');
const { usersModel } = require('../models/index.models');

/**
 * Verificacion de token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const authMiddleware = async (req, res, next) => {
  try {

    if (!req.headers.authorization) {
      handleHttpError(res, 'No token', 401);
      return;
    }

    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);

    if (!dataToken._id) {
      handleHttpError(res, 'No token payload id', 401)
      return;
    }

    const user = await usersModel.findById(dataToken._id);
    req.user = user;

    next();

  } catch (error) {
    handleHttpError(res, 'Error en verifiacion de token', 401);
  }
}

module.exports = authMiddleware;