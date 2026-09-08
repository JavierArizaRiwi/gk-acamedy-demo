import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}
  findByEmail(email: string) { return this.model.findOne({ email: email.toLowerCase() }).exec(); }
  findById(id: string) { return this.model.findById(id).exec(); }
  async list() { return this.model.find().select('-passwordHash').sort({ createdAt: -1 }).lean(); }
  async setActive(id: string, active: boolean) {
    const user = await this.model.findByIdAndUpdate(id, { active }, { new: true }).select('-passwordHash');
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
  create(data: Partial<User>) { return this.model.create(data); }
  countStudents() { return this.model.countDocuments({ role: 'STUDENT', active: true }); }
}
