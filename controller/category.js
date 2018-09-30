const {Router} = require('express')
const router = Router()
const categoryModel = require('../models/categorys')

router.post('/category',async(req,res,next)=>{
    try {
        if(req.session.user){
            const {name} = req.body
            const data = await categoryModel.create({
                name
            })
            res.json({
                code:200,
                msg:'分类添加成功',
                data
            })
        }else{
            res.json({
                code:400,
                msg:'请登陆'
            })
        }
    } catch (error) {
        next(error)
    }   
})

router.get('/category',(req,res)=>{
    categoryModel.find().then(data=>{
        res.json({
            code:200,
            data
        })
    })    
})

router.get('/category/:id',(req,res)=>{
    const {id} = req.params
    categoryModel.findById(id).then(data=>{
        res.json({
            code:200,
            data
        })
    })
})

module.exports = router