import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ strict: false })
export class SailType extends Document {
   
}
export const SailTypeSchema = SchemaFactory.createForClass(SailType);