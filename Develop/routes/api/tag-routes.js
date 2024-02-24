const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include:[{model:Product}]
    })
  }catch(err){
    res.status(500).json({message:"not found"})
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
try {
  const tagData = await Tag.findByPk(req.oarans.id, { include: [{model: Product}],
  })
}catch (err){
  res.status(500).json({message: "not found"})
}
if (!tagData){
  res.status (404).json({message:"no tag found"});
  return;
}
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tagData =await Tag.create(req.body);
    res.status(200).json(tagData);
  }catch{
    res.status(500).json({message:"not found"})
  }
});

router.put('/:id',async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updated=await Tag.update(req.body,{
      where: {id: req.params.id},
    });
    !updated[0]
    ? res.status(404).json({message:'no tag found'})
    : res.status(200).json(updated);
  }catch{
    res.status(500).json({message:"not found"})}
});

router.delete('/:id',async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deleted = await Tag.destroy({where:{id: req.params.id}})
  }catch{
    res.status(500).json({message:"not found"})}
});

module.exports = router;
