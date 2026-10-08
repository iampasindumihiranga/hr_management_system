function Navbar() {

    return (
        <header
            style={{
                height: "65px",
                backgroundColor: "white",
                borderBottom: "1px solid #e5e5e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 25px",
                boxSizing: "border-box"
            }}
        >

            <div>

                <h3
                    style={{
                        margin: 0
                    }}
                >
                    HR Management System
                </h3>

            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}
            >

                <span>
                    Admin
                </span>

                <div
                    style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        backgroundColor: "#1d5fa7",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold"
                    }}
                >
                    A
                </div>

            </div>

        </header>
    );
}

export default Navbar;