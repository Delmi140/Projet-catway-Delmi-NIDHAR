const mongoose = require('mongoose'); 
const Schema = mongoose. Schema;

class CatwaysModel {

     catway = new Schema ({
        
        catwayNumber: {
            type : Number, 
            trim : true 
            
        },
        type: {
            type: String,
            trim : true 
            
         },
        catwayState:{
            type : String,
            trim : true 
           
        }
    },{
        timestamps: true 
    });

    Catway = mongoose.model('Catway', this.catway)

   
    async listCatways() {
        try {
            const catways = await this.Catway.find().exec()
            return catways
        }
        catch (error) {
            throw error
        }
        
    }

    async getCatwayById(catwayId) {
        try {
            const catway = await this.Catway.findById(catwayId).exec()
            return catway
        }
        catch (error) {
            throw error
        }

    }

    async addCatway(newCatway) {
        try {
            const newCatwayMongoose = new this.Catway(newCatway)
            const catwayRegistered = await newCatwayMongoose.save()
            return catwayRegistered._id
        }
        catch (error) {
            throw error 
        }

    }

    async updateCatway(catway) {
        try {
            await this.Catway.findByIdAndUpdate(catway._id, catway)
        }
        catch (error) {
            throw error 
        }

    }

    async deleteCatway(catwayId){
        try {
            await this.Catway.findByIdAndDelete(catwayId)

        }
        catch (error) {
            throw error
        }

    }



}

module.exports = new CatwaysModel()