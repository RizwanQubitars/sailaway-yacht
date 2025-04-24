import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ strict: false })
export class Region extends Document {
   
}
export const RegionSchema = SchemaFactory.createForClass(Region);