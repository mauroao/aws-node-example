import { InstanceList, Instance } from 'aws-sdk/clients/ec2';
import chalk from 'chalk';

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

  items.forEach((item) => {
    //const instanceId = item.InstanceId;
    const name = item.Name.padEnd(34, ' ');
    let state = item.State?.padEnd(10, ' ');
    const platform = item.Platform.padEnd(9, ' ');
    const monitorType = item.MonitorType;

    if (item.State == 'stopped') {
      state = chalk.red(state);
    }
    if (item.State == 'running') {
      state = chalk.green(state);
    }

    console.log(/*instanceId, */ name, state, platform, monitorType);
  });
}
