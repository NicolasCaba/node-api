const { handleHttpError } = require('../utils/handleError');

/**
 * Array con los roles permitidos
 * @param {*} role 
 * @returns 
 */
const checkRole = (role) => (req, res, next) => {

  try {
    const { user } = req;
    const rolesByUser = user.role;

    const checkValueRole = role.some((roleSingle) => rolesByUser.includes(roleSingle));

    if (!checkValueRole) {
      handleHttpError(res, 'Usuario no tiene permisos', 401);
      return;
    }

    next();

  } catch (error) {
    handleHttpError(res, 'Error en permisos', 401)
  }
}

module.exports = checkRole;