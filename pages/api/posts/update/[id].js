import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';

export default async function handler(req, res) {
	if (req.method !== 'PUT') return req.status(405).end();

	//manggil eksekusi auth dulu ke middlewares
	const auth = await authorization(req, res);

	const { id } = req.query ;
	const { title, content }	= req.body;

	const update = await db('posts')
	.where({ id })
	.update({
		title,
		content
	});

	const updateData = await db('posts').where({ id }).first();

	res.status(200);
	res.json({
		message : 'sucesss update',
		data : updateData
	})	;

}