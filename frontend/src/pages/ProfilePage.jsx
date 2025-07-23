import { useEffect, useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

const ProfilePage = () => {
  const { token, login } = useAuth();
  const [form, setForm] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setForm({ username: res.data.username, email: res.data.email });
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put("/api/auth/me", form);
      toast.success("Profile updated!");
      login(token, res.data.user); // update context
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePwChange = (e) => {
    setPwForm({ ...pwForm, [e.target.name]: e.target.value });
  };

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    setPwSaving(true);
    try {
      await api.put("/api/auth/me/password", pwForm);
      toast.success("Password updated!");
      setPwForm({ currentPassword: "", newPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setPwSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="card bg-base-100 shadow-xl p-8">
        <button
          className="btn btn-ghost mb-4 flex items-center"
          onClick={() => navigate("/")}
        >
          <ArrowLeftIcon className="size-5 mr-2" />
          Back to Home
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
        <h3 className="text-xl font-semibold mb-2 text-center">Change Password</h3>
        <form onSubmit={handlePwSubmit} className="space-y-4">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={pwForm.currentPassword}
            onChange={handlePwChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={pwForm.newPassword}
            onChange={handlePwChange}
            className="input input-bordered w-full"
            required
          />
          <button
            type="submit"
            className="btn btn-secondary w-full"
            disabled={pwSaving}
          >
            {pwSaving ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage; 