import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ strict: false })
export class Cabin extends Document {
   
}
export const CabinSchema = SchemaFactory.createForClass(Cabin);