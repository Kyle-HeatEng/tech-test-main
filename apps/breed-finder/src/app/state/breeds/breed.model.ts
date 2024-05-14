export type BreedState = {
  breedList: string[]
  breedDetails: {
    success: boolean | null;
    details: Breed | null;
  }
}

export type Breed = {
  name: string;
  description: string;
  size: string;
  origin: string;
  lifeExpectancy: string;
  temperament: string[];
  image: string;
};