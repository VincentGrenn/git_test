function Logger(req, res, next) {
    console.log(`URL: ${req.url}`);
    console.log(`METHOD: ${req.method}`);
};

export default Logger;