const EC2 = require('aws-sdk/clients/ec2');
const ec2 = new EC2({apiVersion: '2016-11-15', region: 'us-east-1'});
const ec2AsyncExecutor = require('./aws-ec2-async-executor');
const instanceParser = require('./instance-parser');
const instanceSorter = require('./instance-sorter')

const run = async () => {
    const response = await ec2AsyncExecutor.describeInstances(ec2);
    const instances = instanceParser.parse(response);
    instanceSorter.sort(instances);

    instances.forEach(item => console.log(`${item.InstanceId}   ${item.Name.padEnd(30, ' ')}   ${item.State}  ${item.Platform}`))
}

run();