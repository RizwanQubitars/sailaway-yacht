import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ strict: false })
export class Equipment extends Document {
   
}
export const EquipmentSchema = SchemaFactory.createForClass(Equipment);