const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
const apiRoutes = require('./api/tag');
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
  // find all tags
  router.get('/', async (req, res) => {
    try {
      const tags = await Tag.findAll();
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try {
    const tags = await Tag.findByPk(req.params.id);
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
      id: req.body.id,
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
//   Tag.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((tags) => {
//       // find all associated tags from ProductTag
//       return ProductTag.findAll({ where: { product_id: req.params.id } });
//     })
//     .then((productTags) => {
//       // get list of current tag_ids
//       const productTagIds = productTags.map(({ tag_id }) => tag_id);
//       // create filtered list of new tag_ids
//       const newProductTags = req.body.tagIds
//         .filter((tag_id) => !productTagIds.includes(tag_id))
//         .map((tag_id) => {
//           return {
//             product_id: req.params.id,
//             tag_id,
//           };
//         });
//       // figure out which ones to remove
//       const productTagsToRemove = productTags
//         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         ProductTag.destroy({ where: { id: productTagsToRemove } }),
//         ProductTag.bulkCreate(newProductTags),
//       ]);
//     })
//     .then((updatedProductTags) => res.json(updatedProductTags))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });

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
