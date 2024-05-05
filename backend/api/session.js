async function Session(req, res) {
    try {
        const userDatas = req.session.user;
        if (!userDatas) {
            return res.status(401).json({ message: "No session created" });
        }
        else {
            res.status(200).json({
                sessionData: userDatas,
                success: true,
                message: "Got Successful",
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    };
};

module.exports = { Session };