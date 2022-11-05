const router = require('express').Router();
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
    res.status(404).json({ message: 'No category found with that id!'})
    };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  const data = await Category.create(req.body);
  res.status(200).json(data);
  } catch (err) {
  res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try { 
    const data = Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    if (!data) {
      res.status(404).json({ message: 'No category found with that ID'})
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
try { 
    const data = Category.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!data) {
    res.status(404).json({ message: 'No category found with that ID'})
    }
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
