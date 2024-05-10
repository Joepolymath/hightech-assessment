import mongoose from 'mongoose';

const toDatabase = function toDatabase() {
  // TODO
};

const toDomainModel = function toDomainModel(
  databaseDoc: any,
  DomainModel: mongoose.Model<
    any,
    {},
    {},
    {},
    mongoose.Document<unknown, {}, any> &
      any & {
        _id: mongoose.Types.ObjectId;
      },
    any
  >
) {
  return new DomainModel(databaseDoc);
};

module.exports = {
  toDatabase,
  toDomainModel,
};
