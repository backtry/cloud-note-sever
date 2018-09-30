const {Router} = require('express')
const router = Router()
const userModel = require('../models/user')

router.post('/user',async(req,res,next)=>{
    try{
        const {username,password,email} = req.body

        const avatarNumber = Math.ceil(Math.random()*9)
        const avatar = `http://pbl.yaojunrong.com/avatar${avatarNumber}.jpg`
       
        if(password&&password.length>5){
            const data = await userModel.create({username,password,email,avatar})
            console.log(data)
            res.json({
                code:200,
                msg:'注册成功'
            })
        }else{
            throw '密码长度不符合要求'
        }
    }catch(err){
        res.json({
            code:400,
            msg:'缺少必要参数',
            err
        })
    }
})

router.post('/login',async(req,res,next)=>{
    try {
        const {email,password} = req.body
        const userData = await userModel.findOne({email})
        if(!userData){
            res.json({
                code:400,
                msg:'用户不存在'
            })
        }else{
            if(password&&password==userData.password){
                req.session.user = userData
                res.json({
                    code:200,
                    msg:'登陆成功',
                    userData
                })
            }else{
                res.json({
                    code:400,
                    msg:'密码不正确'
                })
            }
        }
    } catch (err) {
        res.json({
            code:400,
            msg:err
        })
    }
})

router.get('/logout',(req,res)=>{
    if(req.session.user){
        req.session.user = null
        res.json({
            code:200,
            msg:'退出登录成功'        
        })
    }else{
        res.json({
            code:403,
            msg:'用户未登录'
        })
    }
})

module.exports = router;