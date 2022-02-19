const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.json(tags);
  } catch (error) {
    res.json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, { 
      include: [{ model: Product }]
    })
    res.json(tag);
  } catch (error) {
    res.json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const { id, tag_name } = req.body;
  try {
    const newTag = await Tag.create({
      id,
      tag_name,
    });
    res.json(newTag)
  } catch (error) {
    res.json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.json(tagData);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.findByPk(req.params.id);
    await Tag.destroy({
        where: {
            id: req.params.id,
        }
    });
    res.json(deletedTag);
} catch (error) {
    res.json(error);
}
});

module.exports = router;
