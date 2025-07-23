import { userRepository } from "@repositories/usersRepository";

export const usersController = {
  async getAll() {
    return {users: await userRepository.getAll()};
  },
}