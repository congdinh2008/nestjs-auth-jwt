import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const createdUser = await new this.userModel(createUserDto).save();
    return createdUser;
  }

  async findAll(): Promise<any[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string, withArticle = false): Promise<any> {
    const query = this.userModel.findById(id);

    if (withArticle) {
      query.populate({ path: 'articles', select: 'title' });
    }

    const user = (await query.exec()) as any;
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    } else {
      return Object.assign(
        {},
        {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          articles: user.articles,
        },
      );
    }
  }

  async findByUsername(username: string): Promise<any> {
    return this.userModel.findOne({ username }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
