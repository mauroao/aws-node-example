import {EC2} from 'aws-sdk';
import {describeInstances} from './async-executor';
import {getInstances} from './response-handler';
import {print} from './report';

const ec2 = new EC2({apiVersion: '2016-11-15', region: 'us-east-1'});

const run = async () => {
    const response = await describeInstances(ec2);
    const instances = getInstances(response);
    print(instances);
}

run();