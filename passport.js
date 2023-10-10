//config fiel of passport
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const UserModel = require("./models/User");
const bcrypt = require("bcrypt-nodejs");

passport.serializeUser((user, done)=>{
	done(null, user._id);
});
passport.deserializeUser((user, done)=>{
	done(null, user._id);
});

passport.use(new LocalStrategy(
	{usernameField: "email"}, (email, password, done)=>{
		UserModel.findOne({"email": email}).then(function(user){
			if (!user) {
				return done(null, false, {"message": "Wrong Password"})
			} else {
				return done(null, user);
			}
			return done(null, false, {"message": "Invalid Credentials"})
		});
	}
));

passport.use(new JWTStrategy({
	"jwtFromRequest":ExtractJWT.fromAuthHeaderAsBearerToken(),
	"secretOrKey": "victoriasecret"
}, function(jwtPayload, callback){
	return UserModel.findONe(jwtPayload.id)
	.then(function (user){
		return callback(null, user);
	}).catch(function(err){
		return callback(err);
	});
}));