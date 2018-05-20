module.exports={
    saveCountry:function (req,db,callback) {
        var collection = db.collection('country');
        collection.insert({
                _id:req.body.countryId,
                countryName:req.body.countryName,
            },
            function (err,result) {
                callback(err,result)
            }
        );
    },

    saveState:function (req,db,callback) {
        var collection = db.collection('state');

        collection.insert({
                countryId:req.body.countryId,
                _id:req.body.stateId,
                stateName:req.body.stateName
            },
            function (err,result) {
                callback(err,result)
            }
        );
    },

    saveDistrict:function (req,db,callback) {
        var collection = db.collection('district');
        collection.insert({
                countryId:req.body.countryId,
                stateId:req.body.stateId,
                _id:req.body.districtId,
                districtName:req.body.districtName
            },
            function (err,result) {
                callback(err,result)
            }
        );
    },

    getCountry:function (req,db,callback) {
        console.log('db:'+db);
        var collection = db.collection('country');
        collection.find({}).toArray(function (err, country) {
            callback(country);
        });
    },

    getStateByCountryId:function (req,db,callback) {
        console.log('db:'+db);
        var collection = db.collection('state');
        collection.find({countryId:req.params.countryId}).toArray(function (err, state) {
            callback(state);
        });
    },

    getDistrictByStateId:function (req,db,callback) {
        var collection = db.collection('district');
        collection.find({stateId:req.params.stateId}).toArray(function (err, district) {
            callback(district);
        });
    }
};