USE authn;

DELIMITER //

-- Return id of registered passkeys for login
CREATE PROCEDURE get_passkeys()
BEGIN
    SELECT id, transports FROM Passkeys;
END //

DELIMITER ;