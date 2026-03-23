# Authorization server policy
# Grants the auth service read access to its own secrets and PKI operations.

# Read application secrets (OAuth client credentials, signing keys, etc.)
path "secret/data/authorization-server/*" {
  capabilities = ["read"]
}

path "secret/metadata/authorization-server/*" {
  capabilities = ["read", "list"]
}

# Issue and sign certificates via PKI
path "pki/issue/*" {
  capabilities = ["create", "update"]
}

path "pki/sign/*" {
  capabilities = ["create", "update"]
}

path "pki/cert/*" {
  capabilities = ["read"]
}

# Allow the service to renew and revoke its own token
path "auth/token/renew-self" {
  capabilities = ["update"]
}

path "auth/token/revoke-self" {
  capabilities = ["update"]
}
