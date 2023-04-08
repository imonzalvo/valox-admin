#!/bin/bash

# check if the argument is "dev" or "prod"
if [ "$1" == "dev" ]; then
    # rename "fly_dev.toml" to "fly.toml"
    mv fly_dev.toml fly.toml
fi

# deploy using fly
fly deploy

# if the argument is "dev", rename "fly.toml" back to "fly_dev.toml"
if [ "$1" == "dev" ]; then
    mv fly.toml fly_dev.toml
fi