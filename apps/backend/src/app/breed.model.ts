export type Breed = {
  name: string;
  description: string;
  size: string;
  origin: string;
  lifeExpectancy: string;
  temperament: string[];
  image: string;
}

export type ApiResponse<T> = {
  data: T[];
  success: boolean;
  message?: string; 
}