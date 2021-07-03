module.exports.describeInstances = async (ec2) => {
    return new Promise((resolve, reject) => {
        const params = {};
        const callback = (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(data);
            };
        };
        ec2.describeInstances(params, callback);
    });
};