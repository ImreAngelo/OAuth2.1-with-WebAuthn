#!/bin/bash
set -e

# Create users and give permissions
mariadb -u root -p"$MYSQL_ROOT_PASSWORD" <<-EOSQL
    CREATE USER IF NOT EXISTS 'auth'@'%' IDENTIFIED BY '${AUTH_PASSWORD}';
    GRANT EXECUTE ON authn.* TO 'auth'@'%';

    -- TODO: Use stored procedures for all dangerous operations like delete
    GRANT SELECT, INSERT ON authn.Users TO 'auth'@'%';
    GRANT SELECT, INSERT ON authn.Passkeys TO 'auth'@'%';
EOSQL