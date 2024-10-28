import { User } from "discord.js";

export default interface UserRepository {
  create(Input: User): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User[]>;
  updateUser(id: Number, Input: User): Promise<void>;
}
