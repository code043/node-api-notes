export default class User {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly image?: string,
    readonly id?: number
  ) {}
}
