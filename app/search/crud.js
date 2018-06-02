module.exports={
    searchServicesDetail: function(req,db,callback) {    
        var collection = db.collection('services');
        var stringText = new RegExp(req.body.name, 'i');
        var queryString = { name: stringText }; 
        collection.find(queryString).toArray(function(err, result){
            callback(err,{success: true, data: result});
        });
    }   
}
