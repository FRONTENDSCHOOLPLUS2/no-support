export type Post = {
  _id: number;
  type: string;
  product_id?: number;
  seller_id: number | null;
  user: {
    _id: number;
    name: string;
    profile?: { originalname: string; name: string; path: string };
  };
  title: string;
  content: string;
  views: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
  product?: {
    name: string;
    image: {
      url: string;
      fileName: string;
      orgName: string;
    };
  };
  repliesCount: number;
};

export type Posts = {
  ok: 0 | 1;
  item: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type PostResponse = {
  ok: 1;
  item: {
    _id: number;
    type: string;
    title: string;
    content: string;
    tag?: string;
    views: number;
    user: {
      _id: number;
      name: string;
      profile?: { originalname: string; name: string; path: string };
    };
    createdAt: string;
    updatedAt: string;
    seller_id?: number | null;
    extra?: unknown;
    replies: {
      content: string;
      user: {
        _id: number;
        name: string;
        profile?: { originalname: string; name: string; path: string };
      };
      _id: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };
};

export type PostForm = {
  type: string;
  title: string;
  content: string;
  tag?: string;
};

export type PostPostResponse = {
  ok: 0 | 1;
  item: {
    _id: number;
    type: string;
    user: {
      _id: number;
      name: string;
      profile?: { originalname: string; name: string; path: string };
    };
    title: string;
    content: string;
    views: number;
    createdAt: string;
    updatedAt: string;
  };
};

// TODO: 401, 422, 500 에러에도 대응되도록 하려면? - 타이트하도록
export type PostPostErrorResponse = {
  ok: 0;
  message: string;
  errorName?: 'EmptyAuthorization | TokenExpiredError | JsonWebTokenError';
  errors: {
    type: string;
    value: string;
    msg: string;
    path: 'title' | 'content';
    location: string;
  }[];
};

export type PatchPostForm = {
  title: string;
  content: string;
  tag?: string;
  extra?: unknown;
};

export type PatchPostResponse = {
  ok: 0 | 1;
  item: {
    _id: number;
    title: string;
    content: string;
    tag?: string;
    extra?: unknown;
    updatedAt: string;
  };
};

export type DeleteResponse = {
  ok: 0 | 1;
  message?: string;
  errorName?: 'EmptyAuthorization | TokenExpiredError | JsonWebTokenError';
};

export type PostReplyForm = {
  content: string;
};

export type PostReplyResponse = {
  ok: 0 | 1;
  item: {
    content: string;
    user: {
      _id: number;
      name: string;
      profile?: { originalname: string; name: string; path: string };
    };
    _id: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type Reply = {
  _id: number;
  user: {
    _id: number;
    name: string;
    profile?: { originalname: string; name: string; path: string };
  };
  content: string;
  createdAt: string;
  updatedAt: string;
};
export type Replies = {
  ok: 0 | 1;
  item: Reply[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  message?: string;
};

/**
 * {
  "ok": 1,
  "item": {
    "content": "아무말 대잔치",
    "like": 5,
    "user": {
      "_id": 32,
      "name": "lion1",
      "profile": {
        "originalname": "favicon.ico",
        "name": "qrVEra3W9.ico",
        "path": "/files/00-sample/qrVEra3W9.ico"
      }
    },
    "_id": 524,
    "createdAt": "2024.07.12 15:11:54",
    "updatedAt": "2024.07.12 16:31:15"
  }
}


 */
