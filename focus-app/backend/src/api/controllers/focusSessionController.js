const FocusSession = require('../db/models/focusSession');

exports.startSession = async (req, res) => {
    try {
        const session = await FocusSession.create(req.body);
        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Additional focus session-related methods can be added here 