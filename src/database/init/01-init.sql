CREATE DATABASE IF NOT EXISTS authn;
USE authn;

-- Create Tables
CREATE TABLE IF NOT EXISTS Users (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(255) NOT NULL,
    `mail` varchar(255) NOT NULL,
    `dek` char(96) NOT NULL COMMENT 'Data encryption key, must be encrypted by the appropriate KEK',
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `mail_hash` binary(32) NOT NULL UNIQUE /* SHA256 raw binary digest of mail used to check uniqueness */
);

CREATE TABLE IF NOT EXISTS Passkeys (
    id varchar(100) NOT NULL,
    user int(10) unsigned NOT NULL,
    public_key blob NOT NULL,
    webauthn_user_id text NOT NULL,
    counter bigint(20) DEFAULT NULL,
    device_type varchar(32) DEFAULT NULL,
    backed_up tinyint(1) NOT NULL DEFAULT 0,
    transports varchar(255) DEFAULT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    last_used timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (id),
    UNIQUE KEY Passkeys_UNIQUE (user,`webauthn_user_id`) USING HASH,
    KEY Passkeys_id_IDX (id) USING BTREE,
    KEY Passkeys_webauthn_user_id_IDX (`webauthn_user_id`(768)) USING BTREE,
    KEY Passkeys_Users_FK (user),
    CONSTRAINT Passkeys_Users_FK FOREIGN KEY (user) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
);