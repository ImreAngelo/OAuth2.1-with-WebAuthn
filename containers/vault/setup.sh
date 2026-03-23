#!/bin/sh
# Run this script once after the vault has been initialized and unsealed.
# Requires VAULT_TOKEN to be set to the root token.
# Usage: VAULT_TOKEN=<root-token> sh setup.sh

set -e

if [ -z "$VAULT_TOKEN" ]; then
  echo "Error: VAULT_TOKEN is not set" >&2
  exit 1
fi

echo "==> Enabling secrets engines"
vault secrets enable -path=secret kv-v2 || echo "    secret/ already enabled"

echo "==> Writing policies"
vault policy write admin /vault/policies/admin.hcl
vault policy write auth-service /vault/policies/auth-service.hcl

echo "==> Creating administrators group"
vault write identity/group \
  name="administrators" \
  type="internal" \
  policies="admin"

echo "==> Enabling auth methods"
vault auth enable userpass || echo "    userpass already enabled"
vault auth enable approle  || echo "    approle already enabled"

echo "==> Creating AppRole for the authorization server"
vault write auth/approle/role/authorization-server \
  token_policies="auth-service" \
  token_ttl=1h \
  token_max_ttl=4h \
  secret_id_ttl=0 \
  secret_id_num_uses=0

echo ""
echo "==> AppRole credentials for the authorization server"
ROLE_ID=$(vault read -field=role_id auth/approle/role/authorization-server/role-id)
SECRET_ID=$(vault write -f -field=secret_id auth/approle/role/authorization-server/secret-id)

echo "    VAULT_ROLE_ID=$ROLE_ID"
echo "    VAULT_SECRET_ID=$SECRET_ID"
echo ""
echo "Add these to the authorization service environment."
echo "Done."
