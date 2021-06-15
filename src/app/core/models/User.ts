
export class User {
  id!: string;
  name!: string;
  email!: string;
  password!: string; // never retrieved from server, only used temporarily to build new user object.
  token!: string;
}
