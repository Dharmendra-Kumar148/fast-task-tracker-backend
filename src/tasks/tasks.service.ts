import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAllForUser(userId: string) {
    return this.taskModel.find({ user: userId });
  }

  async createTask(userId: string, title: string) {
    return this.taskModel.create({ user: userId, title });
  }
}