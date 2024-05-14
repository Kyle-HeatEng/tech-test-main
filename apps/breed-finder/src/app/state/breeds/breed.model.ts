export type BreedState = {
  breedList: string[]
  breedDetails: {
    success: boolean | null;
    details: Breed | null;
  },
  addBreed: {
    loadStatus: LoadStatus;
    success: boolean | null;
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

export type LoadStatus = 'loading' | 'loaded' | 'not loaded';
