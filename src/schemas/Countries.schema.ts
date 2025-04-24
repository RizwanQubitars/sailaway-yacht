import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ strict: false })
export class Countries extends Document {
   
}
export const CountriesSchema = SchemaFactory.createForClass(Countries);