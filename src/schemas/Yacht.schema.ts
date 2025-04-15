import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Yacht {
    @Prop({ type: [Object], required: true })
    yacht: any[];
}
export const yachtSchema = SchemaFactory.createForClass(Yacht);