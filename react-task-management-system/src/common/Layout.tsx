import React from 'react';

interface LayoutProps {
    email: string;
    onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ email, onLogout }) => {
    return (
        <div>
            <header>
                <div>Email: {email}</div>
                <button onClick={onLogout}>Logout</button>
            </header>
            <main>
                {/* Add your main content here */}
            </main>
        </div>
    );
};

export default Layout;