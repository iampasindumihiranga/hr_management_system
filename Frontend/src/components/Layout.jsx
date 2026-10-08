import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh"
            }}
        >

            <Sidebar />

            <div
                style={{
                    flex: 1,
                    backgroundColor: "#f5f7fb"
                }}
            >

                <Navbar />

                <main>
                    {children}
                </main>

            </div>

        </div>
    );
}

export default Layout;