const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    
    if(apiKey === 'nicolas-01') {
      next();
    } else {
      res.status(403);
      res.send({ error: 'Api key no correcta' });
    }
  } catch (error) {
    res.status(403);
    res.send({ error: 'Error en el custom header' });
  }
}

module.exports = customHeader;