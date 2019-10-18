module.exports = {

  development: {
    client: 'sqlite3', //dbms driver
    connection: {
      filename: './database/auth.db3'
    },
    useNullAsDefault: true,
  },

  migrations: {
    directory: './database/migrations',
    tableName: 'dbmigrations',
  },

  seeds: {
    directory: './database/seeds'
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/sprint-test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
  //needed when using foreign keys
  //to prevent users from entering bad data into a FK column
  pool: {
    afterCreate: (conn, done) => {
     //runs after a connection is made to the sqlite engine
     //turn on FK enforcement
     //enforces foreign key constraints on SQLite, not needed for other DBMSs
     conn.run('PRAGMA foreign_keys = ON', done);    
    }

  },
  

};