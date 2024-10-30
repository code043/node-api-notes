import UserRepository from "../../repositories/UserRepository";

class GetUsers {
  repositorio;
  constructor(noteRepository: UserRepository) {
    this.repositorio = noteRepository;
  }
  async execute(): Promise<Output[]> {
    return await this.repositorio.getUsers();
  }
}
type Output = {
  name: string;
  email: string;
  image?: string;
  id?: number;
};
export default GetUsers;
