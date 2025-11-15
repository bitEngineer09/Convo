import React from 'react'

const LogoutCofirm = ({ setLogoutConfirm, handleLogout, navigate }) => {
    return (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-base-100 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <h3 className="text-xl font-bold mb-2">Confirm Logout</h3>
                <p className="text-base-content/70 mb-6">
                    Are you sure you want to log out?
                </p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => setLogoutConfirm(false)}
                        className="btn btn-success btn-outline">
                        No
                    </button>
                    <button
                        onClick={() => {
                            setLogoutConfirm(false);
                            handleLogout();
                            navigate("/auth")
                        }}
                        className="btn btn-error btn-outline">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LogoutCofirm