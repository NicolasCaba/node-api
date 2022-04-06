const bcryptjs = require('bcryptjs');

const encrypt = async (passwordPlain) => await bcryptjs.hash(passwordPlain, 10);

const compare = async (passwordPlain, hash) => await bcryptjs.compare(passwordPlain, hash);

module.exports = { encrypt, compare }