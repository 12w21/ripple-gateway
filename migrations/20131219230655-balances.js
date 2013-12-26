var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('balances', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    bankAccountId: { type: 'int',  notNull: true },
    amount: { type: 'decimal', notNull: true },
    currency: { type: 'string', notNull: true },
    createdAt: { type: 'datetime', notNull: true },
    updatedAt: { type: 'datetime' }
	}, callback);
};

exports.down = function(db, callback) {
  db.dropTable('balances', callback);
};
