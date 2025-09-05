USE authn;

DELIMITER //

CREATE PROCEDURE get_user_passkeys(IN uid INT)
BEGIN
    -- Update access time
    UPDATE Passkeys
    SET last_used = CURRENT_TIMESTAMP
    WHERE user = uid;

    -- Return passkeys
    SELECT * FROM Passkeys
    WHERE user = uid;
END //

DELIMITER ;