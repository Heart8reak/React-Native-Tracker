const express = require('express')
const mongoose = require('mongoose')
const jst = require('jsonwebtoken')
const User = mongoose.model('User')

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { email, password } = req.body 

    try {
        const user = new User({ email, password })
        await user.save() 
        
        const token = jst.sign({ userId: user._id }, 'MY_SECRET_KEY')
        console.log(req.body)
        res.send({ message: 'Congratulations for signing up!', token })

    } catch (err) {
        return res.status(422).send(err.message)
    }
})

module.exports = router