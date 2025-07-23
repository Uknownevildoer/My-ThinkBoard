import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", content: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchNote = async () => {
      try {
        const res = await api.get(`/api/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching note");
      }
    };
    fetchNote();
  }, [id, token, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/api/notes/${id}`);
      toast.success("Note deleted!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/api/notes/${id}`, note);
      toast.success("Note updated!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto py-10">
        <div className="card bg-base-100">
          <div className="card-body">
            <button
              className="btn btn-ghost mb-4 flex items-center"
              onClick={() => navigate("/")}
            >
              <ArrowLeftIcon className="size-5 mr-2" />
              Back to Home
            </button>
            <div className="flex items-center justify-between mb-6">
              <span />
              <button onClick={handleDelete} className="btn btn-error btn-outline">
                <Trash2Icon className="h-5 w-5" />
                Delete Note
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="mb-4">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Title"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                  disabled={saving}
                />
              </div>
              <div className="mb-4">
                <textarea
                  className="textarea textarea-bordered w-full min-h-[120px]"
                  placeholder="Content"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                  disabled={saving}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
