import jwt from 'jsonwebtoken';

export default function authorization(req, res) {
	return new Promise((resolve, reject) => {
		//ngambil dri header
		const { authorization } = req.headers; 

		if (!authorization) return res.status(405).end();

		const authSplit = authorization.split(' ');
		const [authType, authToken] = [
		authSplit[0],
		authSplit[1]
		]

		if (authType !== 'Bearer' ) return res.status(401).end();

		return jwt.verify(authToken, 'uwuw' , function(err,decoded) {
			if(err) return res.status(401).end();

			return resolve(decoded);
		});
	});
}