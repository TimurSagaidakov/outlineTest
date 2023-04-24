export enum BeerServiceQueryKey {
  GetBeers = 'GetBeers',
}

export enum WeightUnit {
  kg = 'kilograms',
  gr = 'grams',
}

export type IngredientAmount = {
  value: number;
  unit: WeightUnit;
};
export type BeerIngredientMalt = {
  name: string;
  amount: IngredientAmount;
};

export type IngredientHops = {
  name: string;
  amount: IngredientAmount;
  add: string;
  attribute: string;
};
export type BeerIngredients = {
  malt: BeerIngredientMalt[];
  hops: IngredientHops[];
  yeast: string;
};

export type Beer = {
  id: string;
  name: string;
  tagLine: string;
  first_brewed: string;
  description: string;
  image_url: string;
  contributed_by: string;
  ingredients: BeerIngredients;
  food_pairing: string[];
};

export type BeerList = Beer[];
