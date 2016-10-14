
module.exports = {
    enableCors: (req, res, next)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, Authorization");

        if ( req.method === 'OPTIONS' ) {
            console.log('OPTIONS SUCCESS');
            res.end();
        } else next();
    }
};