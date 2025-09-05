USE authn;

DELIMITER //

-- Create a new passkey
CREATE PROCEDURE create_passkey(
    IN id VARCHAR(100),
    IN user INT(10) UNSIGNED,
    IN public_key BLOB,
    IN webauthn_user_id TEXT,
    IN counter BIGINT(20),
    IN device_type VARCHAR(32),
    IN transports VARCHAR(255),
    IN backed_up BOOLEAN
)
BEGIN
    INSERT INTO Passkeys (
        id, user, webauthn_user_id, public_key, counter, transports, device_type, backed_up
    )
    VALUES (
        id, user, webauthn_user_id, public_key, counter, transports, device_type, backed_up
    );
END //

DELIMITER ;