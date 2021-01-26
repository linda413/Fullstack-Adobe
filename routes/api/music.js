const { json } = require('express');
const express = require('express');
const axios = require('axios');
const router = express.Router();

// @ route POST api/music
// @desc Send request to artists recommendation API
router.get('/', async (req,res) => {
    const name = req.query.name;
        // Make a request for a user with a given ID
    console.log(name)
    const response = await axios.get('https://tastedive.com/api/similar?q=' + name)
        .then(function (response) {
            // handle success
            console.log(response.data.Similar.Results);  
            return response.data.Similar.Results;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return error
        })
    res.send(response);
});

module.exports = router;