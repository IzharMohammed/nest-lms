import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) { }

  async create(createCourseDto: CreateCourseDto) {
    return await this.courseModel.create(
      {
        description: createCourseDto.description,
        level: createCourseDto.level,
        name: createCourseDto.name,
        price: createCourseDto.price
      })
  }

  async findAll() {
    return await this.courseModel.find()
  }

  async findOne(id: string) {
    return await this.courseModel.findById(id)
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true })
  }

  async remove(id: string) {
    return await this.courseModel.findByIdAndDelete(id)
  }
}
