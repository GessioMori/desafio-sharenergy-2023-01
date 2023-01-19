print('Start ##############################################################');

db = db.getSiblingDB('api_prod_db');
db.createUser({
  user: 'user_prod',
  pwd: 'api1234',
  roles: [{ role: 'readWrite', db: 'api_prod_db' }],
});

db = db.getSiblingDB('api_dev_db');
db.createUser({
  user: 'user_dev',
  pwd: 'api1234',
  roles: [{ role: 'readWrite', db: 'api_dev_db' }],
});

db = db.getSiblingDB('api_test_db');
db.createUser({
  user: 'user_test',
  pwd: 'api1234',
  roles: [{ role: 'readWrite', db: 'api_test_db' }],
});

print('END ##############################################################');
