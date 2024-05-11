import { IRepository } from '../../@types/interfaces/repository.types';
import { IMessage } from '../../@types/message';
import { MessageModel } from '../../data/models/mongodb/message.model';
import MessageRepo from '../../data/repositories/mongodb/messages';

class MessageService {
  constructor(
    private messageRepo: IRepository = new MessageRepo(
      MessageModel
    ).getRepoActions()
  ) {}

  async create(payload: IMessage) {
    const newMessage = await this.messageRepo.create(payload);
  }
}

export default new MessageService();
