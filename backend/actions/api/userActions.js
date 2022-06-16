const User = require('../../db/models/user')
const md5 = require('md5')

class UserActions {
    async saveUser(req, res){

        const _username = req.body.username;
        // const _password  = shajs(req.body.password).update('42').digest('hex');
        const _password  = req.body.password;
        const _email  = req.body.email;
        const _color  = req.body.color;

        // const saltPassword = await bcrypt.genSalt(10)
        // const securePassword = await bcrypt.hash(_password, saltPassword)

        let user;

        try{

            user = new User({
                username: _username.trim(),
                password: md5(_password.trim()),
                email: _email.trim(),
                color: _color.trim()
                }); 
            
            await user.save();

        } catch(err){
            return res.status(422).json({message: err.message})
        }

        res.status(201).json(user);
        
    }

    async authUser(req, res){
        const _username = req.body.username;
        const _password  = req.body.password;
        let user;


        try{

            user = await User.findOne({
                username: _username
            })

            if(user.password !== md5(_password)){
                throw new Error("Incorrect Password");
            }
            

        }catch(err){
            if(err.message === 'Incorrect Password') {
                return res.status(401).json({message: err.message})
            } 
            return res.status(422).json({message: err.message})
        }

        res.status(201).json(user);
    }

    async getUser(req, res){
        const _username = req.body.username;
        let user;

        try{

            user = await User.findOne({
                username: _username
            })

        }catch(err){
            return res.status(422).json({message: err.message})
        }

        res.status(201).json(user);
    }

    async updateUser(req, res){

        const id = req.params.id;
        const password = req.body.password;


        const user = await User.findOne({_id: id});

        user.password = password;

        await user.save()

        res.status(201).json(user)
    }
}

module.exports = new UserActions();