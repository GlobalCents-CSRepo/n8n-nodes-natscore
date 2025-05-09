# Docker run PowerShell script for n8n
# Equivalent to the systemd service configuration

# Stop and remove existing container if it exists

# copy dist folder content to data/custom folder
# delete data/custom folder content first
#
# if (Test-Path -Path "${PWD}/data/custom") {
# 		Remove-Item -Path "${PWD}/data/custom/*" -Recurse -Force
# } else {
# 		New-Item -Path "${PWD}/data/custom" -ItemType Directory
# }
#
# Copy-Item -Path "${PWD}/dist/*" -Destination "${PWD}/data/custom" -Recurse -Force

try {
    docker exec n8n stop
} catch {
    Write-Host "No running container to stop"
}

try {
    docker rm n8n
} catch {
    Write-Host "No container to remove"
}

# Pull the latest image
docker pull docker.n8n.io/n8nio/n8n

# Run the container
docker run --rm --name n8n `
    -v ${PWD}/data:/home/node/.n8n `
    -p 5678:5678 `
    -e N8N_EDITOR_BASE_URL='http://localhost:5678' `
    -e N8N_RUNNERS_ENABLED=true `
    --stop-timeout 60 `
    docker.n8n.io/n8nio/n8n
