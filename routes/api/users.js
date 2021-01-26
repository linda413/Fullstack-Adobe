const { json } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// @ route POST api/users
// @desc Create Users
router.post('/', async (req,res) => {
    console.log(req.body)
    try{
        const newUser = new User({
            name: req.body.name,
          });
    
        const user = await newUser.save();
        console.log(user.name + " Created")
    } catch(err){
        console.log(err.message);
    }

    res.send('User created');
});

router.get('/', async(req, res)=> {
    try {
        const users = await User.find();
    
        if (!users) {
          return res.status(404).json({ msg: 'No Users exists' });
        }
    
        res.json(users);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }

)

module.exports = router;