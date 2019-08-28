module.exports = function (sequelize, DataTypes) {
	const studentModel= sequelize.define('Student', {
		s_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		s_firstname: {
			type: DataTypes.STRING,
			allowNull: false
        },
        s_lastname: {
			type: DataTypes.STRING,
			allowNull: false
        },
        s_email: {
			type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        s_age: {
			type: DataTypes.INTEGER,
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
		tableName: 'student'
    });
   
    return studentModel;
};
