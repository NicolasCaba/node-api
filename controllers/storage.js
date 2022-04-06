const fs = require('fs');
const { matchedData } = require('express-validator');
const { storageModel } = require('../models/index.models');
const { handleHttpError } = require('../utils/handleError');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

// Get storage
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({data});
  } catch (error) {
    handleHttpError(res, 'Error en get items');
  }
};

// Get storage/:id
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

// Create new file
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

// Delete file
const deleteItem = async (req, res) => {

  try {
    req = matchedData(req);
    const { id } = req;
    const dataFile = await storageModel.findById(id);
    await storageModel.delete({_id: id});
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;

    // fs.unlinkSync(filePath);

    const data = {
      filePath,
      deleted: 1,
    }

    res.send({data});
  } catch (error) {
    handleHttpError(res, 'Error en delete item');
  }

};

module.exports = { getItems, getItem, createItem, deleteItem };