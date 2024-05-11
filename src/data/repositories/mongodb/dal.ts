import { Document, FilterQuery, Model, Types } from 'mongoose';
import { IRepository } from '../../../@types/abstractions/repository.abstractions';

class DAL<T extends Document> {
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(payload: Partial<T>) {
    const instance = await new this.model(payload);
    return this.save(instance);
  }

  public async save(instance: Partial<T>) {
    if (instance && instance.save) {
      return await instance.save();
    } else {
      console.error('Instance is undefined or null');
      return null;
    }
  }

  public async findAll(
    query: {
      filter: FilterQuery<T>;
      skip: number;
      limit: number;
    },
    populateData?: string[],
    selectData?: string
  ) {
    if (!populateData) {
      populateData = ['', ''];
    }
    if (!selectData) {
      selectData = '-__v';
    }

    if (!query.skip || !query.limit) {
      query.skip = 0;
      query.limit = 0;
    }

    return await this.model
      .find(query.filter)
      .populate(populateData[0], populateData[1])
      .select(selectData)
      .skip(query.skip)
      .limit(query.limit);
  }

  public async findOne(
    query: FilterQuery<T>,
    populateData?: string[],
    selectData?: string
  ) {
    if (!populateData) {
      populateData = ['', ''];
    }
    if (!selectData) {
      selectData = '-__v';
    }
    return await this.model
      .findOne(query)
      .populate(populateData[0], populateData[1])
      .select(selectData);
  }

  public async findAndUpdate(
    query: FilterQuery<T>,
    update: Partial<T>,
    options: { new: boolean } = { new: true }
  ) {
    return await this.model.findOneAndUpdate(query, update, options);
  }

  public async findByIdAndDelete(id: Types.ObjectId) {
    return await this.model.findByIdAndDelete(id);
  }

  public async countDocs(query: FilterQuery<T>) {
    return await this.model.countDocuments(query);
  }

  public async findById(
    _id: string,
    populateData?: string[],
    selectData?: string
  ) {
    if (!populateData) {
      populateData = ['', ''];
    }
    if (!selectData) {
      selectData = '-__v';
    }
    return await this.model
      .findById(_id)
      .populate(populateData[0], populateData[1])
      .select(selectData);
  }

  getRepoActions(): IRepository {
    return {
      create: this.create,
      save: this.save,
      findOne: this.findOne,
      findAll: this.findAll,
      findAndUpdate: this.findAndUpdate,
      deleteOne: this.findByIdAndDelete,
      findById: this.findById,
    };
  }
}

export default DAL;
