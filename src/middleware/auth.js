const authAdmin = (req, res, next) => {
    const token ='xyz';
    const isAdminAuth = token === 'xyz'
    if(!isAdminAuth){
        res.status(401).send("Admin is not authroized")
    }else{
        next();
    }
}

const authUser = (req, res, next) => {
    const token ='xyz';
    const isUserAuth = token === 'xyz'
    if(!isUserAuth){
        res.status(401).send("User is not authroized")
    }else{
        next();
    }
}

module.exports= { authAdmin, authUser}