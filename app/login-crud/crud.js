module.exports={
    saveNewUserDetails:function (req,db,callback) {
        var collection = db.collection('userDetails');
        console.log(req.body);
        collection.insert(
            {
                userName:req.body.userName,
                _id:req.body._id,
                password:req.body.password,
                mobileNo:req.body.mobileNo,
                userRole:req.body.userRole
            },
            function (err,result) {
                callback(result)
            }
        );
        return callback;
    },
    getUserDetails:function (req,db,callback) {
        var collection = db.collection('tbl-user-credentials');
        collection.find({}).toArray(function (err, userDetails) {
            console.log("Found the following records");
            console.log(userDetails);
            callback(userDetails);
        });
    },
    getUserById:function(req,db,callback){
        var collection = db.collection('tbl-user-credentials');
        collection.find({_id:req.params.id}).toArray(function (err, userDetails) {
            callback(userDetails);
        });
    },
    authenticateUser:function(req,db,callback){
        var collection = db.collection('tbl-user-credentials');
        collection.find({_id:req.body.id}).toArray(function (err, userDetails) {
            callback(userDetails);
        });
    },
    deleteUserDetails:function(req,db,callback){
        var collection = db.collection('userDetails');
        collection.remove({},function(err,result){
            callback(result);
        })
    }
};