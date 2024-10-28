class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];
  constructor() {
    this.users = [];
  }
  async updateUser(id: number, Input: User): Promise<void> {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        this.users[i] = { ...Input, id: id };
      }
    }
  }
  async getUsers(): Promise<User[]> {
    return await this.users;
  }
  async getUserById(id: number): Promise<User[]> {
    return await this.users.filter((user) => user.id === id);
  }
  async create(Input: User): Promise<User> {
    const userwithId = {
      id: this.users.length + 1,
      ...Input,
    };
    await this.users.push(userwithId);
    return userwithId;
  }
}

export default new InMemoryUserRepository();
