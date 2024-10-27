export default class Note {
  constructor(
    readonly title: string,
    readonly body: string,
    readonly id?: number,
    readonly date?: Date
  ) {}
}
