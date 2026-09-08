import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
@Schema({timestamps:true}) export class Plan {
 @Prop({required:true}) name:string;
 @Prop({required:true,enum:['PERSONALIZADO','SEMIPERSONALIZADO','GRUPAL']}) type:string;
 @Prop({required:true,min:0}) price:number;
 @Prop({default:'COP'}) currency:string;
 @Prop({default:30}) durationDays:number;
 @Prop({default:8}) sessionsPerMonth:number;
 @Prop({type:[String],default:[]}) features:string[];
 @Prop({default:true}) active:boolean;
 @Prop({default:''}) description:string;
}
export type PlanDocument=HydratedDocument<Plan>; export const PlanSchema=SchemaFactory.createForClass(Plan);
