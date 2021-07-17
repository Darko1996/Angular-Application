export class Dialog {
  width: DialogMode.SMALL | DialogMode.MEDIUM | DialogMode.LARGE;
  data: any;
  title: string;
  content: string;
}

export enum DialogMode {
  SMALL = '250px',
  MEDIUM = '500px',
  LARGE = '1000px'
}
