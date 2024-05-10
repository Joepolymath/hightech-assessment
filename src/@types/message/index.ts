import { Document } from 'mongoose';

export interface IMessage extends Document {
  subject: string;
  content: string;
  isRead: boolean;
}
