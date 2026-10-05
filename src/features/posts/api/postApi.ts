import { fetchApi } from "@/helpers/apiHelper";

export const postApi = {
  getAll: () => fetchApi("/posts"),
  getById: (id: string | number) => fetchApi(`/posts/${id}`),
  create: (data: { title: string; content: string }) =>
    fetchApi("/posts", {
      method: "POST",
      body: JSON.stringify({ description: data.content }),
    }),
  update: (id: string | number, data: { title: string; content: string }) =>
    fetchApi(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ description: data.content }),
    }),
  delete: (id: string | number) =>
    fetchApi(`/posts/${id}`, {
      method: "DELETE",
    }),
  updateCover: (id: string | number, coverUrl: string) =>
    fetchApi(`/posts/${id}/cover`, {
      method: "PATCH",
      body: JSON.stringify({ cover: coverUrl }),
    }),
};