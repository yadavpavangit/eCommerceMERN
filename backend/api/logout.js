async function Logout(req, res) {
    const session = req.session.user;

    if (!session) {
        return res.status(401).json({ message: "Already Logged out!!" })
    }
    else {
        try {
            req.session.destroy((err) => {
                if (err) {
                    console.error("error in destroying session", err);
                    res.status(500).json({ message: "Logout Failed!! " });
                }
                else {
                    res.clearCookie("connect.sid");
                    res.status(200).json({ message: "Logout Successfully" });
                }
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = { Logout };