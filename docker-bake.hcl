group "default" {
	targets = ["nginx-app"]
}

target "nginx-base" {
	context    = "./containers/nginx"
	dockerfile = "Dockerfile"
	tags       = ["nginx-base:local"]
}

target "frontend-base" {
	context    = "./containers/frontend"
	dockerfile = "Dockerfile"
	tags       = ["frontend-base:local"]
}

target "nginx-app" {
	context    = "."
	dockerfile = "Dockerfile.nginx"
	tags       = ["nginx-proxy:latest"]
	contexts = {
		nginx-base		= "target:nginx-base"    # resolves the FROM nginx-base
		frontend-base	= "target:frontend-base" # resolves the FROM frontend-base
	}
	depends_on = ["nginx-base", "frontend-base"]
}