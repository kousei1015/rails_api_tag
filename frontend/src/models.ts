export type SignRequest = {
  email: string;
  password: string;
};

export type SignResponse = {
  "access-token": string;
  uid: string;
  client: string;
}

export type LoginStatusResponse = {
  is_login: boolean;
  message: string;
}
export type PostRequest = {
  title: string;
  tags?: string;
};

export type ToFavListRequest = {
  post_id: number;
};

export type GetPosts = {
  id: number;
  title: string;
  tags: {
    id: number;
    name: string;
  }[];
}[];

//for generics
export type PostResponse = {
  id: number;
  title: string;
  tags: { id: number; name: string }[];
};

//for generics
export type ToFavListResponse = {
  id: number;
  user_id: number;
  post_id: number;
  title: string;
  tags: [
    {
      id: number;
      name: string;
    }
  ];
};

export type GetFavList = {
  id: number;
  user_id: number;
  post_id: number;
  title: string;
  tags: {
    id: number;
    name: string;
  }[];
}[];

export type ErrorResponse = {
  message: "ERROR";
  data: {
  };
};

export type GenericsSuccesResponse<T> = {
  message: "SUCCESS";
  data: T;
};

export type APIPostResponse<T> = GenericsSuccesResponse<T> | ErrorResponse;
