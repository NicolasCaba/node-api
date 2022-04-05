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

const getItem = async (req, res) => {
  
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findById(id);
    res.send({data});
  } catch (error) {
    handleHttpError(res, 'Error en get item');
  }

};

const createItem = async (req, res) => {

  try {
    const body = matchedData(req);

    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error al crear una nueva cancion');
  }
  
};

const updateItem = async (req, res) => {

  try {
    const { id, ...body } = matchedData(req);

    const data = await tracksModel.findOneAndUpdate(
      id, body
    );
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error al actualizar una nueva cancion');
  }

};

const deleteItem = async (req, res) => {

  try {
    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.deleteOne({_id: id});
    res.send({data});
  } catch (error) {
    handleHttpError(res, 'Error en delete item');
  }

};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };