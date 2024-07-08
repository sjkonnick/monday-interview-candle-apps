const { Fragrances } = require("../db/models");

const getFragrances = async (req, res, next) => {
  try {
    const fragrances = await Fragrances.findAll();
    res.send(fragrances);
    next();
  } catch (err) {
    console.error(err);
    res.send(500);
  }
};

const createFragrance = async (req, res, next) => {
  const { name, description, category, image_url } = req.query;
  try {
    await Fragrances.create({
      name,
      description,
      category,
      image_url,
    });
    res.send(200);
    next();
  } catch (err) {
    console.error(err);
    res.send(500);
  }
};

const updateFragrance = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, category, image_url } = req.query;
  const updatedAt = new Date();
  try {
    await Fragrances.update(
      { name, description, category, image_url, updatedAt },
      {
        where: {
          id,
        },
      }
    );
    res.send(id);
    next();
  } catch (err) {
    console.error(err);
    res.send(500);
  }
};

const deleteFragrance = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Fragrances.destroy({
      where: {
        id,
      },
    });
    res.send(id);
    next();
  } catch (err) {
    console.error(err);
    res.send(500);
  }
};

module.exports = {
  getFragrances,
  createFragrance,
  updateFragrance,
  deleteFragrance,
};
