import { InstanceList } from 'aws-sdk/clients/ec2';

export function print(instances: InstanceList): void {
  const items = instances.map((instance) => {
    return {
      InstanceId: instance.InstanceId,
      State: instance.State?.Name,
      Platform: instance.Platform || 'linux',
      Name: instance.Tags?.find((tag) => tag.Key === 'Name')?.Value || '',
      MonitorType:
        instance.Tags?.find((tag) => tag.Key === 'MonitorType')?.Value || ''
    };
  });

  items.sort((a: any, b: any) => {
    const first = `${a.State} ${a.MonitorType} ${a.Name}`;
    const second = `${b.State} ${b.MonitorType}  ${a.Name}`;
    return first > second ? 1 : -1;
  });

  items.forEach((item) =>
    console.log(
      `${item.InstanceId}   ${item.Name.padEnd(34, ' ')}   ${item.State?.padEnd(
        10,
        ' '
      )}  ${item.Platform.padEnd(9, ' ')} ${item.MonitorType}`
    )
  );
}
