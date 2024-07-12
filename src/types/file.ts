export type PostFileResponse = {
  ok: 0 | 1;
  item: {
    originalname: string;
    name: string;
    path: string;
  }[];
};
