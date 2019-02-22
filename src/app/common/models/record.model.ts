export interface RecordInterface {
  title: string;
  division: string;
  projectOwner: string;
  budget: number;
  status: string;
  created: Date;
  modified: Date;
}

export class Record implements RecordInterface {
  title: string = '';
  division: string = '';
  projectOwner: string = '';
  budget: number = 0;
  status: string = '';
  created: Date = null;
  modified: Date = null;

  constructor(args: RecordInterface) {
    if (args) {
      Object.keys(args).forEach(key => {
        switch (key) {
          case 'created':
          case 'modified':
            this[key] = new Date(args[key]);
            break;
          default:
            if (this.hasOwnProperty(key)) {
              this[key] = args[key];
            }
        }
      });
    }
  }
}
