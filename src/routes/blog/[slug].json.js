import fs from 'fs';

export async function get(req, res, next) {
	const { slug } = req.params;
	const filename = 'static/_posts/' + slug + '.md';
	
	try {
		fs.statSync(filename);
		const post = await new Promise((resolve, reject) => {
			fs.readFile(filename, (err, data) => {
				if (err) 
					return reject(err);
				return resolve(data);
			});
		});

		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(post);
		
	} catch (error) {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: error.message
		}));
	}
}
