import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ strict: false })
export class Yacht extends Document {
    
   
}
export const yachtSchema = SchemaFactory.createForClass(Yacht);