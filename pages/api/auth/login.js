import db from '../../../libs/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res){
	if(req.method !== 'POST') return res.status(405).end();

	const { email, password } = req.body;

	const CheckUser = await db('users').where({ email }).first();

	if (!CheckUser) return res.status(405).end();

	const CheckPassword = await bcrypt.compare(password, CheckUser.password);

	if (!CheckPassword) return res.status(401).end();

	const token = jwt.sign({
		id: CheckUser.id,
		email : CheckUser.email
		//ini private key/secret key
	}, 'uwuw' , {
		expiresIn: '7d'
	}) ;

	res.status(200);
	res.json({
		message : "Login Success",
		token
	});
}