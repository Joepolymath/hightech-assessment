import { injectable } from 'inversify';
import {
  IMountRepo,
  IRepository,
} from '../../@types/abstractions/repository.abstractions';
import { IMessageService } from '../../@types/abstractions/services/message.services.abstractions';
import { IMessage } from '../../@types/message';
import { MessageModel } from '../../data/models/mongodb/message.model';
import MessageRepo from '../../data/repositories/mongodb/messages';

const repos = {
  messageRepo: new MessageRepo(MessageModel).getRepoActions(),
};

@injectable()
class MessageService implements IMessageService {
  constructor(private repositories: IMountRepo) {}

  async create(payload: IMessage) {
    const newMessage = await this.repositories.messageRepo.create(payload);
  }
}

export default MessageService;
