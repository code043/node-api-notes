import User from "../../../domain/entities/user";
import UserRepository from "../../repositories/UserRepository";

class CreateUser {
  repositorio;
  constructor(noteRepository: UserRepository) {
    this.repositorio = noteRepository;
  }
  async execute(input: Input): Promise<User> {
    return await this.repositorio.create(input);
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
};
export default CreateUser;
