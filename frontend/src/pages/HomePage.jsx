import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import api from "../lib/axios";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchNotes = async () => {
      try {
        const res = await api.get("/api/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        setIsRateLimited(error.response?.status === 429);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      {token && (
        <div className="max-w-7xl mx-auto p-4 text-right text-sm text-gray-500">
          Logged in as: <span className="font-semibold">{user?.username || user?.email || "User"}</span>
        </div>
      )}
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
