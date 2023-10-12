export type IOrderPayload = {
  orderedBooks: IOrderedBooks[];
  userId?: string;
};

export type IOrderedBooks = {
  bookId: string;
  quantity: number;
};
