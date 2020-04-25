import glob from 'glob';

export async function get(req, res, next){
    const posts = await new Promise((resolve, reject) => {
        glob('static/_posts/*.md', (err, files) => {
            if (err)
                return reject(err);
            return resolve(files);
        });
    });

    
}