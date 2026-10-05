"use client";

import { useState, FormEvent } from "react";
import Modal from "@/components/ui/Modal";
import { useAppDispatch } from "@/hooks/redux";
import { createPost, fetchPosts } from "../states/postSlice";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePostModal({
  isOpen,
  onClose,
}: CreatePostModalProps) {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError(null);
    try {
      await dispatch(createPost({ title: content, content })).unwrap();
      await dispatch(fetchPosts());
      setContent("");
      onClose();
    } catch (err) {
      setError(typeof err === "string" ? err : "Gagal membuat postingan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Buat Postingan Baru">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="create-content"
            className="block text-sm font-medium text-slate-300 mb-1"
          >
            Konten
          </label>
          <textarea
            id="create-content"
            required
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 resize-none"
            placeholder="Tuliskan isi postingan..."
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-sm font-medium"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Publikasikan"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
