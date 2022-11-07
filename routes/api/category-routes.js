const router = require('express').Router();
const { response } = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const data = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const data = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }]
    });
    if (!data) {
      res.status(404).json({ message: 'No category found with that id!' })
    };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  if (!req.body?.category_name) res.status(400).json({ message: 'Missing category name in request body'})
  try {
    const data = await Category.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!data) {
      res.status(404).json({ message: 'No category found with that ID' })
    }
    res.status(200).json({message: `Successfully updated category with id ${req.params.id}`})
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!data) {
      res.status(404).json({ message: 'No category found with that ID' })
    }
    res.status(200).json({message: `Successfully deleted category with id ${req.params.id}`})
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
