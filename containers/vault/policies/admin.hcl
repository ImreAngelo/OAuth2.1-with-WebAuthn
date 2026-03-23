# Admin group policy
# Grants full access to manage Vault, including auth methods, policies,
# secrets engines, and system configuration.

# Manage auth methods
path "auth/*" {
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Manage policies
path "sys/policies/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Manage secrets engines
path "sys/mounts/*" {
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Read system health, status, and configuration
path "sys/health" {
  capabilities = ["read", "sudo"]
}

path "sys/capabilities" {
  capabilities = ["create", "update"]
}

path "sys/capabilities-self" {
  capabilities = ["create", "update"]
}

# Manage tokens
path "auth/token/*" {
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Manage identity (entities and groups)
path "identity/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Read and manage all secrets
path "secret/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Audit log management
path "sys/audit*" {
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Manage leases
path "sys/leases/*" {
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Allow admins to look up their own token info
path "auth/token/lookup-self" {
  capabilities = ["read"]
}

path "auth/token/renew-self" {
  capabilities = ["update"]
}

path "auth/token/revoke-self" {
  capabilities = ["update"]
}
