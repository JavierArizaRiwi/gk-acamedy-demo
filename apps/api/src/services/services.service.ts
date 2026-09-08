import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceDto, UpdateServiceDto } from './dto';
import { Service, ServiceDocument } from './service.schema';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service.name) private model: Model<ServiceDocument>) {}

  list(activeOnly = true) {
    return this.model.find(activeOnly ? { active: true } : {}).sort({ order: 1, createdAt: -1 }).lean();
  }

  create(dto: CreateServiceDto) {
    return this.model.create(dto);
  }

  async update(id: string, dto: UpdateServiceDto) {
    const service = await this.model.findByIdAndUpdate(id, dto, { new: true, runValidators: true }).lean();
    if (!service) throw new NotFoundException('Servicio no encontrado');
    return service;
  }
}
