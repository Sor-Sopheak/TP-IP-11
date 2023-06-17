import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema( {
  timestamps: true
})
export class User {

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop({
    unique: [true, 'Duplicate username entered']
  })
  username: string;

  @Prop({ unique: true, required: true})
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);