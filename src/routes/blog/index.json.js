import fs from 'fs';
import fm from 'front-matter';

export async function get(req, res, next){
    const postDirectory = 'static/_posts/';

    try {
        const filenames = fs.readdirSync(postDirectory);
        const filePromises = [];
        filenames.forEach(file => {
            filePromises.push(new Promise((resolve, reject) => {
                fs.readFile(postDirectory + file, (error, fileData) => {
                    if(error)
                        return reject(error);
                    const parsedFile = fm(fileData.toString()); 
                    const fileWithDates = { slug: file.slice(0, -3), title: parsedFile.attributes.title, date: parsedFile.attributes.date };
                    return resolve(fileWithDates);
                });
            }));
        });

        const files = await Promise.all(filePromises); 
        console.log(files);
        const sortedFiles = files.sort((a, b)=> new Date(a.date) - new Date(b.date));

        console.log(sortedFiles);

        res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify(sortedFiles));
    }
    catch (error) {
        res.writeHead(500, {
            'Content-Type' : 'application/json'
        });

        res.end(JSON.stringify({
			message: error.message
		}));
    }
}