import { InstanceList, Instance } from 'aws-sdk/clients/ec2';
import chalk from 'chalk';

function getTagValue(instance: Instance, key: string): string {
  return instance.Tags?.find((tag) => tag.Key === key)?.Value || '';
}

class ReportLine {
  InstanceId: string;
  State: string;
  Platform: string;
  Name: string;
  MonitorType: string;
  WeekDayTime: string;
  WeekEndTime: string;

  constructor(instance: Instance) {
    this.InstanceId = instance.InstanceId || '';
    this.State = instance.State?.Name || '';
    this.Platform = instance.Platform || 'linux';
    this.Name = instance.Tags?.find((tag) => tag.Key === 'Name')?.Value || '';
    this.MonitorType = getTagValue(instance, 'MonitorType');

    const monitorSettings = getTagValue(instance, 'MonitorSettings') || '{}';

    this.WeekDayTime = JSON.parse(monitorSettings).WeekDayTime || '';
    this.WeekEndTime = JSON.parse(monitorSettings).WeekEndTime || '';
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
    const name = item.Name.padEnd(34, ' ');
    let state = item.State?.padEnd(10, ' ');
    const platform = item.Platform.padEnd(9, ' ');
    const monitorType = item.MonitorType.padEnd(16, ' ');
    const weekDayTime = item.WeekDayTime.padEnd(21, ' ');
    const weekEndTime = item.WeekEndTime.padEnd(10, ' ');

    if (item.State == 'stopped') {
      state = chalk.red(state);
    }
    if (item.State == 'running') {
      state = chalk.green(state);
    }

    console.log(name, state, platform, monitorType, weekDayTime, weekEndTime);
  });
}
