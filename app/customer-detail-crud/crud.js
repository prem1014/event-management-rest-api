module.exports={
    saveCustomerDetail: function(req,db,callback) {
        var collection = db.collection('customer-details');
        collection.insert({
            _id: req.body.id,
            name: req.body.name,
            emailAddress: req.body.emailAddress,
            address: req.body.address
        }, function(err, result) {
            callback(err,{success: true});     
        });
    }
}