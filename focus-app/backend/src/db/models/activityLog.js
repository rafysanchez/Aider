const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class ActivityLog extends Model {}

ActivityLog.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    action_type: {
        type: DataTypes.ENUM('create', 'update', 'delete'),
        allowNull: false,
    },
    metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'ActivityLog',
    timestamps: false,
});

module.exports = ActivityLog; 