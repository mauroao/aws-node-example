import { DescribeInstancesResult, InstanceList } from 'aws-sdk/clients/ec2';

export function getInstances(param: DescribeInstancesResult): InstanceList {
  const instances: InstanceList = [];

  param.Reservations?.forEach(res => {
      res.Instances?.forEach(inst => instances.push(inst));
  });

  return instances;
};