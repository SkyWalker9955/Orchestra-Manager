const router = require('express').Router();
let User = require('../models/users.model');
let bCrypt = require('bcrypt');

router.route('/').get((req, res) => {
    User.find()
        .select('_id userType fName lName password email userName')
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .select('_id userType fName lName password email userName')
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/add').post((req, res) => {
    const userType = req.body.userType;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const password = User.generateHash(req.body.password);
    const email = req.body.email;
    const userName = req.body.userName;

    const newUser = new User({
        userType,
        fName,
        lName,
        password,
        email,
        userName,
    });

    newUser.save()
        .then(() => res.json('User saved!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() =>res.json('User Deleted'))
        .catch(err => res.status(400).json("Error: " + err))
});

router.route('/edit/:id').put((req, res) => {
    User.findAndModify(req.params.id)
        .then(user => {
            if (user.username != req.body.username)
                user.username = req.body.username;
            if (user.fName != req.body.fName)
                user.fName = req.body.fName;
            if (user.lName != req.body.lName)
                user.lName = req.body.lName;
            if (user.password != req.body.password)
                user.password = req.body.password;
            if (user.email != req.body.email)
                user.email = req.body.email;
            if (user.userType != req.body.userType)
                user.userType = req.body.userType;
        });
});

router.route('/auth/').post(async (req, res) => {
    const userName= req.body.userName;
    const password = req.body.password;
    try  {
        if (userName.search("@") != "-1" && userName.search(".") != "-1") {
            let query = await User.findOne({"email": userName},{_id:0, userType:0, fName:0, lName:0, email:0, userName:0, __v:0})
            .catch(err => console.log(err).json("Error:" + err));
            if (await query == null || await query == undefined) {
                res.status(400).json("Username not found!")
            } else {
                let serverpass = await query.password;

                if (bCrypt.compareSync(password,serverpass) == true) {
                    res.status(200).json("User Authenticated!");
                } else {
                    res.status(400).json("Passwords do not match.");
                }
            }
        } else {
             let query = await User.findOne({"userName": userName},{_id:0, userType:0, fName:0, lName:0, email:0, userName:0, __v:0})
             .catch(err => console.log(err).json("Error:" + err));
            if (query == null || query == undefined) {
                res.status(400).json("Username not found!")
            }
             let serverpass = await query.password;
             
             if (bCrypt.compareSync(password,serverpass) == true) {
                res.status(200).json("User Authenticated!");
            } else {
                res.status(400).json("Passwords do not match.");
            }
        }
    }
    catch (e) {
        console.log(e).json("Error: " + e)
    }
        
});

module.exports = router;