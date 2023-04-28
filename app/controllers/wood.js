const { Wood, Type, Hardness } = require("../models");
const { remove } = require("../helpers/image.js");
const { woodHateoas } = require("../helpers/hateoas.js");

const INCLUDE = [
  {
    model: Type,
    as: "type",
    attributes: ["id", "name"],
  },
  {
    model: Hardness,
    as: "hardness",
    attributes: ["id", "name"],
  },
];

exports.readAll = async (req, res) => {
  try {
    let woods = await Wood.findAll({
      attributes: { exclude: ["hardnessId", "typeId"] },
      include: INCLUDE,
    });
    woods = woods.map((wood) => {
      const links = woodHateoas(req, wood);
      return {
        ...wood.dataValues,
        links,
      };
    });
    res.status(200).json(woods);
  } catch (err) {
    res.status(500).json({
      error: err.message || "Some error occurred while retrieving woods.",
    });
  }
};

exports.readByHardness = async (req, res) => {
  try {
    let woods = await Wood.findAll({
      where: {
        hardnessId: req.params.hardnessId,
      },
      attributes: { exclude: ["hardnessId", "typeId"] },
      include: INCLUDE,
    });
    woods = woods.map((wood) => {
      const links = woodHateoas(req, wood);
      return {
        ...wood.dataValues,
        links,
      };
    });
    res.status(200).json(woods);
  } catch (err) {
    res.status(500).json({
      error: err.message || "Some error occurred while retrieving woods.",
    });
  }
};

exports.create = async (req, res) => {
  try {
    let pathname = null;
    if (req.file) {
      pathname = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const wood = Wood.build({
      ...JSON.parse(req.body.datas),
      image: pathname,
    });

    await wood.save();

    await wood.reload({
      include: INCLUDE,
    });

    delete wood.dataValues.hardnessId;
    delete wood.dataValues.typeId;

    const links = woodHateoas(req, wood);

    const woodWithLinks = {
      ...wood.dataValues,
      links,
    };

    res.status(201).json(woodWithLinks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err.message || "Some error occurred while creating wood.",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const wood = await Wood.findByPk(req.params.id);
    if (!wood) {
      return res.status(404).json({ error: "Wood not found" });
    }
    let newWood = {
      ...JSON.parse(req.body.datas),
    };

    if (req.file) {
      const pathname = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      newWood = {
        ...newWood,
        image: pathname,
      };
      if (wood.image) {
        await remove(wood.image);
      }
    }

    await wood.update(newWood);
    await wood.reload({
      include: INCLUDE,
    });

    delete wood.dataValues.hardnessId;
    delete wood.dataValues.typeId;

    res.status(200).json(wood);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while updating wood.",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const wood = await Wood.findByPk(req.params.id);
    if (!wood) {
      return res.status(404).json({ error: "Wood not found" });
    }
    if (wood.image) {
      await remove(wood.image);
    }
    await wood.destroy();
    res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while deleting wood.",
    });
  }
};
