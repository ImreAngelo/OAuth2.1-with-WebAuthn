# Vault Server

## Required Configuration

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

5. Create a new user 

## (Optional) Create a new user
5. Enable an authentication method
    - Go to `Access > Authentication Methods > Enable new method +`
    - Select any from the list and go through the setup process

6. 


## Authenticating services
The services need users as well.



## Public-Key Infrastructure

1. Enable PKI in secrets engines

2. Choose one of the options:
    - In local development, generate a root CA
    - In production, generate intermediate CSR for signing and see <a href="#csr">production mode<a href>
    - Or import a CA if you have one

3. Set type to `internal` to make sure the private key never leaves vault

4. Give the certificate a name, for example "something"

5. Open key params and set key type to `ec` and at least 256 bits!

6. (Optional) Configure SAN and additional fields



<h2 id="csr">Production mode (TODO)</h2>