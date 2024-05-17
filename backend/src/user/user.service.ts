import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ILike, Not } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserQuery } from './user.query';

@Injectable()
export class UserService {
  async save(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findByUsername(createUserDto.username);

    if (user) {
      throw new HttpException(
        `User with username ${createUserDto.username} is already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password } = createUserDto;
    createUserDto.password = await bcrypt.hash(password, 10);
    return User.create(createUserDto).save();
  }

  async findAll(userQuery: UserQuery, page: number, limit: number): Promise<{ users: User[], count: number }> {
    let whereCondition = {}
    Object.keys(userQuery).forEach((key) => {
      if (key !== 'role') {
        whereCondition[key] = ILike(`%${userQuery[key]}%`);
      }
    });
    whereCondition['role'] = Not('admin');
    let users: User[] = await User.find({
      where: whereCondition,
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    let count = await User.count({ where: whereCondition });
    return { users, count };
  }

  async findById(id: string): Promise<User> {
    const user = await User.findOne(id);

    if (!user) {
      throw new HttpException(
        `Could not find user with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return User.findOne({ where: { username } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const currentUser = await this.findById(id);

    /* If username is same as before, delete it from the dto */
    if (currentUser.username === updateUserDto.username) {
      delete updateUserDto.username;
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.username) {
      if (await this.findByUsername(updateUserDto.username)) {
        throw new HttpException(
          `User with username ${updateUserDto.username} is already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return User.create({ id, ...updateUserDto }).save();
  }

  async delete(id: string): Promise<string> {
    await User.delete(await this.findById(id));
    return id;
  }

  async count(): Promise<number> {
    return await User.count();
  }

  /* Hash the refresh token and save it to the database */
  async setRefreshToken(id: string, refreshToken: string): Promise<void> {
    const user = await this.findById(id);
    await User.update(user, {
      refreshToken: refreshToken ? await bcrypt.hash(refreshToken, 10) : null,
    });
  }
}
