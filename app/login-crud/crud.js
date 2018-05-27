module.exports={
    saveNewUserDetails:function (req,db,callback) {
        var collection = db.collection('tbl-user-credentials');
        console.log(req.body);
        collection.insert(
            {
                name:req.body.name,
                _id:req.body.email,
                password:req.body.password,
                mobile:req.body.mobile,
                role:req.body.role
            },
            function (err,result) {
                callback({
                    name: req.body.name,
                    mobile:req.body.mobile,
                    email: req.body.email
                })
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