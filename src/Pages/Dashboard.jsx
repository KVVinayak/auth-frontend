import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await API.get("/profile");
                setProfile(response.data.user);
            } catch (error) {
                localStorage.removeItem("token");
                setError("Please log in again.");
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    if (loading) {
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return <p role="alert">{error}</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>

            {profile && (
                <div>
                    <p>Welcome, {profile.name}!</p>
                    <p>Email: {profile.email}</p>
                </div>
            )}

            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;