import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ strict: false })
export class CountryState extends Document {
   
}
export const CountryStateSchema = SchemaFactory.createForClass(CountryState);