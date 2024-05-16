export type BreedState = {
  breedList: string[]
  breedDetails: {
    //Normally would include a loadStatus however, wanted to
    //keep to the maximum of 1 optional task.
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
