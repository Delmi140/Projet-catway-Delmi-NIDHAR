const mongoose = require('mongoose'); 
const Schema = mongoose. Schema;



class UsersModel {

    user = new Schema ({
        name: {
            type : String,
        
            required:true 
        },
        firstname: {
            type : String,
            required:true 
        },
        email: {
            type : String,
           
            required:true 
            
        },
        password:{
            type : String,
            required:true 
        }
    },{
        timestamps: true 
    });


    User = mongoose.model('User', this.user)


    async listUsers(){
        try {
            const users = await this.User.find().exec()
            return users
        }
        catch (error) {
            throw error
        }

    }


    async getUserById(userId) {
        try {
            const user = await this.User.findById(userId).exec()
            return user
        }
        catch (error) {
            throw error
        }

    }


    async addUser(newUser) {
        try {
            const newUserMongoose = new this.User(newUser)
            const userRegistered = await newUserMongoose.save()
            return userRegistered._id
        }
        catch (error) {
            throw error
        }

    }

    async updateUser(user) {
        try {
            await this.User.findByIdAndUpdate(user._id, user)
        }
        catch (error) {
            throw error
        }

    }

    async deleteUser(userId) {
        try {
            await this.User.findByIdAndDelete(userId)
        }
        catch (error) {
            throw error
        }

    }



}

module.exports = new UsersModel()
