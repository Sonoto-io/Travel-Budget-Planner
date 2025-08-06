import type { Prisma } from "@prisma/client";
import { userRepository } from "@repositories/usersRepository";
import { status, t } from "elysia";

export const usersController = {
  async getAll() {
    return { users: await userRepository.getAll() };
  },
  async create(body: Prisma.UserCreateInput) {
    if (body) {
      try {
        const res = await userRepository.create(body);
        return {
          message: `User ${body.label} created`,
          data: res,
          status: status(201),
        };
      } catch (error) {
        return {
          status: status(400),
          message: `A user with label "${body.label}" already exists.`,
        };
      }
    } else {
      return { message: "User is undefined", status: status(400) };
    }
  },
  async delete(id: string) {
    try {
      const res = await userRepository.delete(id);
      return {
        message: `User ${res.label} deleted`,
        data: res,
        status: status(200),
      };
    } catch (error) {
      return { message: error, status: status(400) };
    }
  },
  async update(id: string, user: Prisma.UserUpdateInput) {
    const res = await userRepository.update(id, user);
    return {
      message: `User ${user.label} updated`,
      data: res,
      status: status(200),
    };
  },
};