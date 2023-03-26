module.exports = {
    catchError(res, error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        })
    },

    resourceError(res, message){
        res.status(400).json({
            message
        })
    }
}