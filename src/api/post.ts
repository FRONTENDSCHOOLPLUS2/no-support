import { PatchPostForm, PostForm, PostReplyForm } from '#types/post';
import api from '@api/axiosInstance';

export const getPosts = async <T>(type: string) => {
  console.log(`/posts${type && '?' + type}`);
  return api.get<T>(`/posts${type && '?' + type}`);
};

export const getPost = async <T>(_id: string) => {
  return api.get<T>(`/posts/${_id}`);
};

export const postPost = async <T>(data: PostForm) => {
  return api.post<T>(`/posts`, data);
};

export const patchPost = async <T>(data: PatchPostForm & { _id: number }) => {
  return api.patch<T>(`/posts/${data._id}`, data);
};

export const deletePost = async <T>(_id: string) => {
  return api.delete<T>(`/posts/${_id}`);
};

export const getReplies = async <T>(_id: string | undefined) => {
  if (_id === undefined) return;
  return api.get<T>(`/posts/${_id}/replies`);
};

export const postReply = async <T>({
  _id,
  content,
}: PostReplyForm & { _id: string }) => {
  return api.post<T>(`/posts/${_id}/replies`, { content });
};

export const deleteReply = async <T>({
  _id,
  replyId,
}: {
  _id: string;
  replyId: string;
}) => {
  return api.delete<T>(`/posts/${_id}/replies/${replyId}`);
};
