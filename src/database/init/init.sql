CREATE DATABASE IF NOT EXISTS authn;
USE authn;

CREATE USER IF NOT EXISTS 'auth'@'%' IDENTIFIED BY 'authpass';
GRANT EXECUTE ON authn.* TO 'auth'@'%';

-- TODO: Use stored procedures for all dangerous operations like delete
GRANT SELECT, INSERT ON authn.Users TO 'auth'@'%';
GRANT SELECT, INSERT ON authn.Passkeys TO 'auth'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON authn.UserRoles TO 'auth'@'%';