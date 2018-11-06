const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

// create a sequelize instance with our local mysql database information.
const sequelize = new Sequelize('your-database', 'your-username', 'your-password',{
    host     : 'localhost',
    dialect : 'mysql',
    "operatorsAliases": false
});

// setup User model and its fields.
var User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
});

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password,this.password)  
}


// setup Hostel model and its fields.
var Hostel = sequelize.define("hostels", {
    username: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    hostel_name: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    distance: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    infra: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    clean: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    staff: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    room: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    lift: {
        type: Sequelize.INTEGER,
        allowNull: false,
        max: 5,
        min: 0
    },
    exp: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    remarks: {
        type: Sequelize.STRING(1000),
        allowNull: true
    }
});

// setup Mess model and its fields.
var Mess = sequelize.define("mess", {
    username: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    mess_name: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    quality: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    utensils: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    variety: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    staff: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    exp: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    remarks: {
        type: Sequelize.STRING(1000),
        allowNull: true
    }
});


// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('Connected to database...'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = { sequelize, User, Hostel, Mess };
