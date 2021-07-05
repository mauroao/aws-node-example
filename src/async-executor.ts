import { AWSError, EC2 } from 'aws-sdk';
import { DescribeInstancesResult } from 'aws-sdk/clients/ec2';

export const describeInstances = async (ec2: EC2): Promise<DescribeInstancesResult> => {
    return new Promise((resolve, reject) => {
        const params = {};
        const callback = (err: AWSError, data: DescribeInstancesResult) => {
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