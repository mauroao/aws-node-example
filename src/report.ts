import { InstanceList, Instance } from 'aws-sdk/clients/ec2';

class ReportLine {
  InstanceId: string;
  State: string;
  Platform: string;
  Name: string;
  MonitorType: string;

  constructor(instance: Instance) {
    this.InstanceId = instance.InstanceId || '';
    this.State = instance.State?.Name || '';
    this.Platform = instance.Platform || 'linux';
    this.Name = instance.Tags?.find((tag) => tag.Key === 'Name')?.Value || '';
    this.MonitorType =
      instance.Tags?.find((tag) => tag.Key === 'MonitorType')?.Value || '';
  }
}

export function print(instances: InstanceList): void {
  const items = instances.map((instance) => new ReportLine(instance));

  items.sort((a: ReportLine, b: ReportLine) => {
    const first = `${a.State} ${a.MonitorType || ''} ${a.Name}`;
    const second = `${b.State} ${b.MonitorType || ''}  ${a.Name}`;
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
