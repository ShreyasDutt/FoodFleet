import express from 'express';
const router = express.Router();


router.post('/foodData', async (req, res) => {
try{
    console.log(global.food_items)
    // eslint-disable-next-line no-undef
    res.send([global.food_items,global.foodCategory])
}
catch(error){
    console.log(error);
}

})

export default router;
