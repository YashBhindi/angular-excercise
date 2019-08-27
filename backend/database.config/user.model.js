module.exports = function (sequelize, DataTypes) {
	const userModel= sequelize.define('User', {
		u_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		u_name: {
			type: DataTypes.STRING,
			allowNull: false
        },
        u_email: {
			type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        u_password: {
			type: DataTypes.STRING,
			allowNull: true
        },
        u_refresh_token: {
			type: DataTypes.TEXT,
			allowNull: true
        },
        u_role: {
			type: DataTypes.STRING,
			allowNull: false
        },
		created_by: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		modified_by: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		modified_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'users'
    });
   
    return userModel;
};
