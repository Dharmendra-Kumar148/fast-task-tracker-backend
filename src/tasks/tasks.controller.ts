import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(@Req() req) {
    return this.tasksService.findAllForUser(req.user.userId);
  }

  @Post()
  async addTask(@Req() req, @Body('title') title: string) {
    return this.tasksService.createTask(req.user.userId, title);
  }
}