module.exports={
    saveServiceDetails:function (req,db,callback) {
        var collection = db.collection('services');
        collection.insert({
                _id: req.body.id,
                name: req.body.name,
                type: req.body.type,
                district: req.body.district,
                fullAdress: req.body.fullAdress,
                pinCode: req.body.pinCode
            },function (err,result) {
                callback(err,{success: true})
            }
        );        
    }    
}    