import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import { IMessage } from '../../../@types/message';

const messageSchema = new Schema<IMessage>(
  {
    subject: {
      type: String,
    },
    content: {
      type: String,
    },
    isRead: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.plugin(mongoosePaginate);

export const MessageModel = mongoose.model<IMessage>('Message', messageSchema);
