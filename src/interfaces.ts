export interface ITimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface IListItem {
  id: string;
  value: string;
}

export interface IIngredient {
  id: string;
  value: string;
}

export interface IStep {
  id: string;
  value: string;
}

export interface INutrient {
  kcal: number | null;
  proteins: number | null;
  fats: number | null;
  carbs: number | null;
  salt: number | null;
  [key: string]: number | null;
}

export interface IRecipe {
  createdAt: ITimestamp | null;
  user: string | null;
  id: string | null;
  title: string;
  desc: string;
  deleted: boolean;
  photoUrl: string;
  groups: string;
  steps: IStep[];
  ingredients: IIngredient[];
  nutrients?: INutrient;
}

export interface IError {
  id: string;
  msg: string | null;
  timestamp?: Date;
}

export interface IUser {
  admin: boolean;
  comments?: null | [];
  createdAt: ITimestamp | null;
  id: string;
  deleted: boolean;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  recipes?: null | [];
}

export interface IRange {
  min: number;
  max: number;
}

export interface IRangeToggle extends IRange {
  tick: boolean;
}
