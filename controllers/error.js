exports.error404 = ((req, res, next) => {
    return res.status(404).send("Not found")
})