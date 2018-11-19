var MongoClient= require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';

function Mongo(options){
    console.log("已连接MongoDb");
    this._run=function(fun){
        MongoClient.connect(url,{useNewUrlParser:true},function(err,client){
            var db=client.db("mydb");
            fun(db,function(){
               client.close();
            });
        });
    };
	this.insert=function(collectionName,data,func){
		//增加数据
		var insertDocument=function(db,callback){
			var collection=db.collection(collectionName);
			collection.insertMany(data,function(err,result){
				if(!err){
					func(true);
				}else{
					func(false);
				}
				callback(result);
			});
		};
		this._run(insertDocument);
	}
	this.update=function(collectionName,updateData,data,callback){
		//更新数据
		var updateDocument=function(db){
			var collection=db.collection(collectionName);
			collection.updateOne(updateData,{$set:data},function(err,result){
				callback(result.result.n);
			});
		};
		this._run(updateDocument);
	};
	this.find=function(collectionName,data,func){
		//条件查询数据
		var findDocument=function(db,callback){
			var collection=db.collection(collectionName);
			collection.find(data).toArray(function(err,docs){
				if(!err){
					func(true,docs);
				}else{
					func(false,err);
				}
				callback(docs);
			});
		};
		this._run(findDocument);
	};
	this.findall=function(collectionName,func){
		//查询数据
        var findDocument=function(db,callback){
            var collection=db.collection(collectionName);
			collection.find().toArray(function(err,docs){
				if(!err){
					func(true,docs);
				}else{
					func(false,err);
				}
				callback(docs);
			});
		};
		this._run(findDocument);
	};
	this.findByPage=function(collectionName,data,skip,func){
		//分页查询数据
        var findDocument=function(db,callback){
            var collection=db.collection(collectionName);
			collection.find(data).skip(Number(skip)).limit(12).toArray(function(err,docs){
				if(!err){
					func(true,docs);
				}else{
					func(false,err);
				}
				callback(docs);
			});
		};
		this._run(findDocument);
	};
}

module.exports = Mongo;