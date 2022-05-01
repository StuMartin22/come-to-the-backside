const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
  router.get('/', async (req, res) => {
    try {
      const tags = await Tag.findAll({include:[{model:Product},{model:ProductTag}]});
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // be sure to include its associated Product data

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try {
    const tags = await Tag.findByPk(req.params.id, {include:[{model:Product},{model:ProductTag}]});
    if (!tags) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tags = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id
      },
    })
    if (!tag) {
      res.status(404).json({ message: 'There is no tag with this ID!'})
      return
    }
    await tag.update({ tag_name: req.body.tag_name})
    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tags = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tags) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
