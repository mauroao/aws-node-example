import { InstanceList } from 'aws-sdk/clients/ec2';

export function print(instances: InstanceList): void {
  const items = instances.map((instance) => {
    return {
      InstanceId: instance.InstanceId,
      State: instance.State?.Name,
      Platform: instance.Platform || 'linux',
      Name: instance.Tags?.find((tag) => tag.Key === 'Name')?.Value || ''
    };
  });

  items.sort((a: any, b: any) => {
    const first = `${a.Platform} ${a.Name}`;
    const second = `${b.Platform} ${b.Name}`;
    return first > second ? 1 : -1;
  });

  items.forEach((item) =>
    console.log(
      `${item.InstanceId}   ${item.Name.padEnd(30, ' ')}   ${item.State}  ${
        item.Platform
      }`
    )
  );
}
