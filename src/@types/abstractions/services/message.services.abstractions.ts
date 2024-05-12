import { IMessage } from '../../message';

export interface IMessageService {
  create(payload: IMessage): void;
}
