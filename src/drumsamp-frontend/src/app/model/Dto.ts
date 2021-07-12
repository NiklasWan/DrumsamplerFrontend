export type LibraryResponseDTO = { libName: string, samples: Array<SampleDTO> };
export type GenericResponseDTO = { message: string };
export type SampleDTO = { name: string, tags: Array<string>, isFavorite: boolean };