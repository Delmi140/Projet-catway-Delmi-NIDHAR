const mongoose = require('mongoose'); 
const Schema = mongoose. Schema;
const bcrypt = require('bcrypt');



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
           
            required:true,

            unique: true 
            
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

            const salt = await bcrypt.genSalt(10); // Le "10" est le facteur de coût
            newUser.password = await bcrypt.hash(newUser.password, salt);


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

    async findOne(query) {
        try {
            return await this.User.findOne(query).exec();
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new UsersModel()
