import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ strict: false })
export class Service extends Document {
   
}
export const ServiceSchema = SchemaFactory.createForClass(Service);