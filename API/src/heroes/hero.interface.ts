import * as mongoose from 'mongoose';

export interface IHero extends mongoose.Document {
  readonly _id: number;
  readonly name: string;
}
