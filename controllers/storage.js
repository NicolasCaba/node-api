const { matchedData } = require('express-validator');
const { storageModel } = require('../models/index.models');
const { handleHttpError } = require('../utils/handleError');

const PUBLIC_URL = process.env.PUBLIC_URL;

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({data});
  } catch (error) {
    handleHttpError(res, 'Error en get items');
  }
};

const getItem = async (req, res) => {

  try {
    req = matchedData(req);
    const { id } = req;
    const data = await storageModel.findById(id);
    res.send({data});
  } catch (error) {
    handleHttpError(res, 'Error en get item');
  }

};

const createItem = async (req, res) => {

  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    }
    
    const data = await storageModel.create(fileData);
    res.send({data});
  } catch (error) {
    handleHttpError(res, 'Error en create Item');
  }
  
};

const updateItem = async (req, res) => {

  try {
    const { id, ...body } = matchedData(req);

    const data = await storageModel.findOneAndUpdate(
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
    const data = await storageModel.delete({_id: id});
    res.send({data});
  } catch (error) {
    handleHttpError(res, 'Error en delete item');
  }

};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };