export class AuthResponse {
  constructor(
    readonly localId: string,
    readonly idToken: string,
    readonly email: string,
    readonly refreshToken: string,
    readonly expiresIn: string,
    readonly registered: boolean
  ) {}
}
