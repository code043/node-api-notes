import Note from "./note";

export default class User {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly notes?: Note[],
    readonly image?: string,
    readonly id?: number
  ) {}
}