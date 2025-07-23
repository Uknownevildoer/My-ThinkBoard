import { ArrowLeftIcon } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const CreatePage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setSaving(true);
    try {
      await api.post("/api/notes", { title, content });
      toast.success("Note created!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating note");
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
            <h2 className="text-2xl font-bold mb-4">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={saving}
                />
              </div>
              <div className="mb-4">
                <textarea
                  className="textarea textarea-bordered w-full min-h-[120px]"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={saving}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Create Note"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
