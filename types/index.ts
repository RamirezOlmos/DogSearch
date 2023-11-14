export interface SearchBreedProps {
  breedsToSearch: string[];
  setBreedsToSearch: (breeds: string[]) => void;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface Dogs {
  img: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
  id: string;
}
