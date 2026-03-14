variable "IMAGE_PREFIX" {
	default = ""
}

group "default" {
	targets = ["nginx-app"]
}

target "frontend-base" {
	context    = "./containers/frontend"
	dockerfile = "Dockerfile"
	tags       = ["frontend-base:local"]
}

target "nginx-app" {
	context    = "./containers/nginx"
	dockerfile = "Dockerfile"
	tags       = ["nginx-proxy:latest"]
	contexts = {
		frontend-base	= "target:frontend-base"
	}
	depends_on = ["nginx-base", "frontend-base"]
}

# CI target - inherits nginx-app but tags and caches against the registry
target "nginx-app-push" {
	inherits   = ["nginx-app"]
	tags       = ["${IMAGE_PREFIX}/nginx-proxy:latest"]
	cache-from = ["type=registry,ref=${IMAGE_PREFIX}/nginx-proxy:cache"]
	cache-to   = ["type=registry,ref=${IMAGE_PREFIX}/nginx-proxy:cache,mode=max"]
}