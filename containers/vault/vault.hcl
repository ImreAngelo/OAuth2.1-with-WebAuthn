storage "file" {
  path = "/vault/file"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = true  # TLS is terminated by nginx
}

api_addr       = "http://0.0.0.0:8200"
ui             = true
disable_mlock  = true
