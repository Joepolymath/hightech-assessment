import { Document, Model } from 'mongoose';
import DAL from '../dal';

export default class MessageRepo<T extends Document> extends DAL<T> {
  constructor(model: Model<T>) {
    super(model);
  }
}
