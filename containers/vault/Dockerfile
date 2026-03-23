FROM hashicorp/vault:latest

COPY --chown=vault:vault vault.hcl /vault/config/vault.hcl
COPY --chown=vault:vault policies/ /vault/policies/
COPY --chown=vault:vault setup.sh /usr/local/bin/setup.sh

# entrypoint: ["/usr/bin/start.sh", "/vault/config/vault.hcl"]