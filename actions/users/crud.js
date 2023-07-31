const sha1 = require('sha1');

module.exports = (api) => {

    const User = api.models.User;

    function create(req, res, next) {

        let user = User.build( req.body );
        user.password = sha1(user.password);
        User.findAll({
            where: {
                email: user.email
            }
        }).then(function(anotherTask) {
            if(anotherTask[0] != null){
                return res.status(401).send('login.already.exists');
            }
            user
                .save()
                .then(function(anotherTask) {
                    return res.send(user);
                }).catch(function(error) {

                    return res.status(500).send(error);
            })

        }).catch(function(error) {
            console.log("test");
            return res.status(500).send(error)
        });


    }

    function findAll(req, res, next) {

        User.findAll().then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findOne(req, res, next) {

        User.findAll({
            where: {
                id: req.params.id
            }
        }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    function update(req, res, next) {
        User
            .find({ where: { id: req.params.id} })
            .then(function(user) {
                // Check if record exists in db
                if (!user) {
                    return res.status(204).send(anotherTask);
                }
                user
                    .updateAttributes(req.body)
                    .then(function (updated) {
                        return res.send(updated);
                    }).catch(function(error) {
                    return res.status(500).send(error)
                });
            });

    }

    function destroy(req, res, next) {
        User.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(user) {
            return res.send(user);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }


    return {
        create,
        findAll,
        findOne,
        update,
        destroy
    };
};