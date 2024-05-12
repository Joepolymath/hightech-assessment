export interface IRepository {
  create: (data: any) => Promise<any>;
  save?: (data: any) => Promise<any>;
  findOne: (query: any) => Promise<any>;
  findAll: (query: any) => Promise<any>;
  findAndUpdate: (query: any, updateData: any, options?: any) => Promise<any>;
  deleteOne: (query: any) => Promise<any>;
  findById?: (query: any) => Promise<any>;
}

export interface IMountRepo {
  messageRepo: IRepository;
}
