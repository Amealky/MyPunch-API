module.exports = (api) => {

    const Session = api.models.Session;

    function findAll(req, res, next) {

        Session.findAll().then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findForUser(req, res, next) {

        Session.findAll({
            where: {
                id_user: req.idUser
            },
            order: [['start', 'DESC']]
        }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    function create(req, res, next) {

        let sessions  = req.body;
        if (sessions.length < 1) {
            return res.send(412);
        }

        //for (let i = 0; i < sessions.length; i++) {
            sessions['id_user'] =  req.idUser;
            //let session = Session.build(sessions[i]);
            let session = Session.build(sessions);
            session
                .save()
                .then()
                .catch(function(error) {
                return res.status(500).send(error)
            });
        //}
        return res.send(201);
    }
    function findAllWithRelation(req, res, next) {

        api.mysql.query("SELECT m.id, m.latitude, m.longitude, m.severity, m.state, m.address,m.city, p.firstName, p.lastName, p.blood, p.phone ," +
            "  (SELECT GROUP_CONCAT(c.name)" +
            "   FROM conditions c" +
            "   WHERE c.idProfile = m.idProfile) AS combinedsolutions " +
            //"FROM missions m " +
            //"  LEFT JOIN profiles as p ON p.id = m.idProfile " +
           // "WHERE m.state = 'En Attente'" +
            //" OR (m.updatedAt <= CURRENT_TIMESTAMP - INTERVAL 10 MINUTE and m.state = 'Valid')" +
            "ORDER BY m.severity DESC", { model: api.models.MissionCons }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });


    }
    return {
        findAll,
        findForUser,
        create
    };
};