const { matchedData } = require('express-validator');
const { tracksModel } = require('../models/index.models');
const { handleHttpError } = require('../utils/handleError');

const getItems = async (req, res) => {

  try {
    const data = await tracksModel.find({});
    res.send({data});
  } catch (error) {
    handleHttpError(res, 'Erro en get items');
  }
  
};

const getItem = (req, res) => {};

const createItem = async (req, res) => {

  try {
    const body = matchedData(req);

    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error al crear una nueva cancion');
  }
  
};

const updateItem = (req, res) => {};

const deleteItem = (req, res) => {};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };