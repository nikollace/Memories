import jwt from 'jsonwebtoken'

//wants to like a post
//click the like button => auth middleware (next) => like controller ... 
//samo ako sme da lajkuje poziva se next()

const auth = async (req, res, next) => {
    try {
        //prihvatamo token poslat sa frontenda interceptors itd...
        const token = req.headers.Authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            //sub odredjuje google usera(nesto kao id)
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;