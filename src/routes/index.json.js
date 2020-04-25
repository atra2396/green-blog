import glob from 'glob';

export async function get(req, res, next){
    const posts = new Promise((resolve, reject) => {
        glob('static/')
    });
}