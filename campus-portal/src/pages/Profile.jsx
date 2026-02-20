import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import styles from "../styles/booking.module.css";
import BookingLayout from "../components/booking/BookingLayout";

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setName(parsedUser.name || "");
            setPhone(parsedUser.phone || "");
        } else {
            navigate("/");
        }
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        if (!name || !phone) {
            setMessage({ type: "error", text: "Please fill all fields" });
            setLoading(false);
            return;
        }

        if (phone.length !== 10) {
            setMessage({ type: "error", text: "Phone number must be 10 digits" });
            setLoading(false);
            return;
        }

        try {
            const response = await api.put(`/api/users/${user.id}/profile`, {
                name,
                phone
            });

            if (response.status === 200) {
                // Update local storage with new info
                const updatedUser = { ...user, name, phone };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
                setMessage({ type: "success", text: "Profile updated successfully!" });
            }
        } catch (err) {
            const errMsg = err.response?.data?.message || (typeof err.response?.data === 'string' ? err.response.data : "Failed to update profile");
            setMessage({ type: "error", text: errMsg });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("ARE YOU SURE? This will permanently delete your account and all your bookings. This action cannot be undone.")) {
            return;
        }

        setLoading(true);
        try {
            await api.delete(`/api/users/${user.id}`);
            localStorage.removeItem("user");
            alert("Account deleted successfully.");
            navigate("/");
        } catch (err) {
            const errMsg = err.response?.data?.message || "Failed to delete account";
            setMessage({ type: "error", text: errMsg });
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <BookingLayout title="👤 My Profile">
            <div className={styles.glassCard} style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 className={styles.sectionTitle}>Account Information</h2>

                <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.9rem', color: '#4a5568', fontWeight: 600 }}>Login ID (Email)</label>
                        <input
                            type="text"
                            value={user.email}
                            disabled
                            style={{
                                padding: '0.75rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                background: '#f7fafc',
                                color: '#a0aec0',
                                cursor: 'not-allowed'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label style={{ fontSize: '0.9rem', color: '#4a5568', fontWeight: 600 }}>Your Role</label>
                        <span className={`${styles.roleBadge} ${styles['role' + user.role]}`} style={{ width: 'fit-content' }}>
                            {user.role}
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label htmlFor="name" style={{ fontSize: '0.9rem', color: '#4a5568', fontWeight: 600 }}>Full Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className={styles.dateInput}
                            style={{ width: '100%', margin: 0 }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <label htmlFor="phone" style={{ fontSize: '0.9rem', color: '#4a5568', fontWeight: 600 }}>Phone Number</label>
                        <input
                            id="phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="10-digit phone number"
                            className={styles.dateInput}
                            style={{ width: '100%', margin: 0 }}
                        />
                    </div>

                    {message.text && (
                        <div className={`${styles.alert} ${message.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
                            {message.text}
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            className={styles.actionButton}
                            disabled={loading}
                        >
                            {loading ? "Saving Changes..." : "Save Changes"}
                        </button>

                        <button
                            type="button"
                            onClick={handleDeleteAccount}
                            disabled={loading}
                            style={{
                                background: 'transparent',
                                color: '#e53e3e',
                                border: '1px solid #feb2b2',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '0.85rem'
                            }}
                        >
                            Delete Account
                        </button>
                    </div>
                </form>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                    onClick={() => navigate('/dashboard')}
                    style={{ background: 'none', border: 'none', color: '#4c51bf', cursor: 'pointer', textDecoration: 'underline', fontWeight: 500 }}
                >
                    Back to Dashboard
                </button>
            </div>
        </BookingLayout>
    );
}

export default Profile;
