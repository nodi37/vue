export type UserData = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

export type GetUsersResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Array<UserData>;
};

export type GetSingleUserResponse = {
  data: UserData;
  support: {
    url: string;
    text: string;
  };
};
