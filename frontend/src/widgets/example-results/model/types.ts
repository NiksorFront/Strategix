export type ExampleResultsItem = {
  title: string;
  result: string;
  unit_measurement?: string;
};

export type ExampleResultsData = {
  description: string;
  items: ExampleResultsItem[];
};
