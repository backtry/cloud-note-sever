const {Router} = require('express')
const router = Router()
const articleModel = require('../models/article')


router.post('/article',async(req,res,next)=>{
    try {
        if(req.session.user){
            const {title,content,contentText,category} = req.body

            const data = await articleModel.create({
                content,
                contentText,
                title,
                category,
                author:req.session.user._id
            }) 
            res.json({
                code:200,
                msg:'笔记发布成功',
                data
            })
        }else{
            res.json({
                code:403,
                msg:'未登录状态不能发布笔记'
            })
        }
    } catch (error) {
        next(error)    
    }
})

router.get('/article',(req,res)=>{
    let {pn=1,size=10} = req.query
    pn=parseInt(pn)
    size = parseInt(size)

    articleModel.find()
        .skip((pn-1)*size)
        .limit(size)
        .populate({
            path:'author',
            select:'-password -email'
        })
        .populate({
            path:'category'
        })
        .then(data=>{
            res.json({
                code:200,
                data
            })
        })
})

router.get('/article/:id',(req,res)=>{
    const {id} = req.params
    articleModel.findById(id)
       
        .populate({
            path:'author',
            select:'-password -email'
        })
        .populate({
            path:'category'
        })
        .then(data=>{
            res.json({
                code:200,
                data
            })
        })
})

module.exports = router