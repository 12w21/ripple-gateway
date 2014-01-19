var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('external_transactions', { 
		id: { type: 'int', primaryKey: true, autoIncrement: true },
    deposit: { type: 'boolean', notNull: true },
    currency: { type: 'string', notNull: true },
    cashAmount: { type: 'decimal', notNull: true },
    externalAccountId: { type: 'int', notNull: true },
    rippleTxId: { type: 'int'},
    createdAt: { type: 'datetime', notNull: true },
    updatedAt: { type: 'datetime' }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('bank_transactions', callback);
};
