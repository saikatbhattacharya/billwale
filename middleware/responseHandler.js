module.exports = {
    errorRes: function(err,res){
        res.send(err)
    },
    response: function(data,res){
        res.send(data);
    }
}