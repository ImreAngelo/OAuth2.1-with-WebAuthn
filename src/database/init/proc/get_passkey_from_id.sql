USE authn;
DROP PROCEDURE IF EXISTS get_passkey_from_id;

DELIMITER //

CREATE PROCEDURE get_passkey_from_id(IN pid VARCHAR(100))
BEGIN
    -- Update access time
    UPDATE Passkeys
    SET last_used = CURRENT_TIMESTAMP
    WHERE id = pid;

    -- Return passkeys
    SELECT * FROM Passkeys
    WHERE id = pid;
END //

DELIMITER ;