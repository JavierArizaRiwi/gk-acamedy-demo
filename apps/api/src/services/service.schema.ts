import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true, trim: true }) name: string;
  @Prop({ required: true, trim: true }) description: string;
  @Prop({ required: true, min: 0 }) price: number;
  @Prop({ default: 'COP', trim: true }) currency: string;
  @Prop({ default: 60, min: 1 }) durationMinutes: number;
  @Prop({ default: true }) active: boolean;
  @Prop({ default: 0, min: 0 }) order: number;
}

export type ServiceDocument = HydratedDocument<Service>;
export const ServiceSchema = SchemaFactory.createForClass(Service);
ServiceSchema.index({ active: 1, order: 1 });
