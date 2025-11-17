export class User {
  constructor(
    public readonly id: string,
    public username: string,
    public email: string,
    public password: string,
  ) {}
}
