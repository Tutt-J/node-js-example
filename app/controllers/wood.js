const { Wood } = require("../models");

exports.readAll = async (req, res) => {
  try {
    const woods = await Wood.findAll();
    res.status(200).json(woods);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving woods.",
    });
  }
};

exports.readByHardness = async (req, res) => {
  try {
    const woods = await Wood.findAll({
      where: {
        hardness: req.params.hardness,
      },
    });
    res.status(200).json(woods);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving woods.",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const pathname = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    const wood = await Wood.create({
      ...JSON.parse(req.body.datas),
      image: pathname,
    });
    res.status(201).json(wood);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Some error occurred while creating wood.",
    });
  }
};
