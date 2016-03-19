module.exports = function (Name, Model, App) {
  const Controller = {
    index: function(req, res){
      Model.find().exec(function(err, users) {
        res.send(users);
      });
    }
  };

  App.resource(Name, Controller);
  return Controller;
};
