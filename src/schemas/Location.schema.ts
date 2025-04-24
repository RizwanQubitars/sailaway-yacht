import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ strict: false })
export class Location extends Document {
   
}
export const LocationSchema = SchemaFactory.createForClass(Location);