import { Role } from './Role';

export class User {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly role: Role,

    readonly token: string,
    readonly refreshToken: string
  ) {}
}
