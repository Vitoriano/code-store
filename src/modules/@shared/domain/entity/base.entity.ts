import Id from "../value-object/id.value-object";

export default class BaseEntity {
  private _id: Id;
  private _createAt: Date;
  private _updateAt: Date;

  constructor(id?: Id, createdAt?: Date, updateAt?: Date) {
    this._id = id || new Id();
    this._createAt = createdAt || new Date();
    this._updateAt = updateAt || new Date();
  }

  get id(): Id {
    return this._id;
  }

  get createAt(): Date {
    return this._createAt;
  }

  get updateAt(): Date {
    return this._updateAt;
  }

  set updateAt(value: Date) {
    this._updateAt = value;
  }
  
}