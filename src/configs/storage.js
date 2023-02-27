module.exports = {
    'local': {
        'folder': process.env.FOLDER || 'uploads'
    },
    'google':{
        bucketName: process.env.BUCKET_NAME || 'bucket'
    }
}