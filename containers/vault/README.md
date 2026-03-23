<h1>Vault Server</h1>


<h2>Required Configuration</h2>
The vault must manually initialized and unsealed. The vault must also be manually 
unsealed every time the container is restarted.

1. Initialize the vault in the containers terminal
```sh
vault operator init
```

<picture>
    <img width="100%" src="../../docs/img/vault-1.png" />
</picture>

2. Note down the unseal keys and root token, and store them somewhere safe

3. Unseal the vault using 3 of the 5 keys generated in step 1
```sh
# Use the UI, or in the CLI:
vault operator unseal
```

4. Log in with root token from step 1
```sh
vault login
```

5. Create a new user for the auth service (see <a href="#auth-services">authenticating services</a>)



<h2>(Optional) Create a new admin user</h2>

1. Login using the root token
```sh
vault login
```

2. Apply the admin policy in the CLI
```sh
vault policy write admin /vault/policies/admin.hcl
```

3. Create an administrator group with the admin policy
```sh
vault write identity/group \
  name="administrators" \
  type="internal" \
  policies="admin"
```

4. Enable an authentication method
    - Go to `Access > Authentication Methods > Enable new method +`
    - Select any from the list and go through the setup process
    - This example uses **userpass**

5. Create a user in the auth method
```sh
vault write auth/userpass/users/<username> \
  password=<password>
```

6. Look up the userpass accessor (needed to link the user to an identity entity)
```sh
vault auth list -format=json | jq -r '."userpass/".accessor'
```

7. Create an identity entity for the user
```sh
vault write identity/entity name="<username>"
```
Note down the `id` from the output.

8. Create an entity alias linking the userpass user to the entity
```sh
vault write identity/entity-alias \
  name="<username>" \
  canonical_id="<entity-id-from-step-7>" \
  mount_accessor="<accessor-from-step-6>"
```

9. Add the entity to the administrators group
```sh
# Get the group ID
vault read identity/group/name/administrators -format=json | jq -r '.data.id'

# Add the entity as a member
vault write identity/group/id/<group-id> \
  member_entity_ids="<entity-id-from-step-7>"
```

10. Verify by logging in as the new admin user
```sh
vault login -method=userpass username=<username>
vault token lookup
# policies should include "admin"
```

11. (Optional) Set up multi-factor authentication




<h2 id="auth-services">Authenticating services</h2>

Services authenticate using the [AppRole](https://developer.hashicorp.com/vault/docs/auth/approle) method. Each service gets a **RoleID** (like a username) and a **SecretID** (like a password) that it exchanges for a short-lived Vault token.

1. Enable the AppRole auth method
```sh
vault auth enable approle
```

2. Create a scoped policy for the service (edit `policies/auth-service.hcl` as needed)
```sh
vault policy write auth-service /vault/policies/auth-service.hcl
```

3. Create an AppRole for the service
```sh
vault write auth/approle/role/auth-service \
  token_policies="auth-service" \
  token_ttl=1h \
  token_max_ttl=4h \
  secret_id_ttl=0 \
  secret_id_num_uses=0
```
> `secret_id_ttl=0` and `secret_id_num_uses=0` mean the SecretID never expires and has unlimited uses — tighten these in production.

4. Retrieve the RoleID and store it in the service's configuration
```sh
vault read auth/approle/role/auth-service/role-id
```

5. Generate a SecretID and store it in the service's configuration
```sh
vault write -f auth/approle/role/auth-service/secret-id
```

6. Verify the credentials work by logging in
```sh
vault write auth/approle/login \
  role_id=<role-id-from-step-4> \
  secret_id=<secret-id-from-step-5>
# token_policies should include "auth-service"
```

The service uses these same credentials at runtime to obtain a token:
```sh
curl -s --request POST \
  --data '{"role_id":"<role-id>","secret_id":"<secret-id>"}' \
  http://vault:8200/v1/auth/approle/login | jq -r '.auth.client_token'
```





<!-- ## Public-Key Infrastructure

1. Enable PKI in secrets engines

2. Choose one of the options:
    - In local development, generate a root CA
    - In production, generate intermediate CSR for signing and see <a href="#csr">production mode<a href>
    - Or import a CA if you have one

3. Set type to `internal` to make sure the private key never leaves vault

4. Give the certificate a name, for example "something descriptive"

5. Open key params and set key type to `ec` and at least 256 bits!

6. (Optional) Configure SAN and additional fields 



<h2 id="csr">Production mode (TODO)</h2> -->