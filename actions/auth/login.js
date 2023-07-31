const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (api) => {
    const User = api.models.User;
    const Token = api.models.Token;
    const UserToSend = api.models.UserToSend;

    function formatUser(user, token) {
        return {
            'id': user.id,
            'email': user.email,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'token': token
        }
    }

    return function login(req, res, next) {

        // #1 trying to find the user
        let user = User.build( req.body );
        User.findOne({
            where: {
                email: user.email,
                password : sha1(user.password)
            }
        }).then(function(user) {
            // #2 no user found with this credentials. Forbidden.
            if (!user) {
                return res.status(401).send('invalid.credentials');
            }

            // #3 starting token creation.
            Token.findOne({
                where: {
                    idUser: user.id,
                    createdAt: {
                        $lt: new Date(),
                        $gt: new Date(new Date() - (1000 * 60 * 60 * api.settings.security.tokenExpiration))
                    }
                }
            }).then(function(find) {
                // if no already existing valid token, create it !
                if((!find) || (find == null)) {
                    console.log("No token found.");
                    let token = Token.build();
                    token.idUser = user.id.toString();
                    // #4 persist the token into the database.
                    token.save()
                        .then(function (token) {
                            // #5 encrypting the token with JWT convention.
                            jwt.sign({
                                    tokenId: token.id.toString() // using the ID of the token has identifier.
                                },
                                api.settings.security.salt,
                                {},
                                (err, encryptedToken) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }

                                    // #6 sending the encrypted token.
                                    Token
                                        .find({ where: { id: token.id} })
                                        .then(function(token) {
                                            // Check if record exists in db
                                            token
                                                .updateAttributes({encryptedToken : encryptedToken})
                                                .then(function (updated) {
                                                    answer = formatUser(user, find.encryptedToken);
                                                    console.log(answer);
                                                    return res.send(answer);
                                                }).catch(function(error) {
                                                return res.status(500).send(error)
                                            });
                                        });
                                }
                            );
                        });
                } else {
                    console.log("Token found.");
                    answer = formatUser(user, find.encryptedToken);
                    console.log(answer);
                    return res.send(answer);
                }
            })
        })
    }
}
