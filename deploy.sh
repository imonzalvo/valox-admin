#!/bin/bash

# check if the argument is "dev"
if [ "$1" == "dev" ]; then
    # rename "fly_dev.toml" to "fly.toml"
    mv fly_dev.toml fly.toml

    # deploy using fly
    fly deploy

    # rename "fly.toml" back to "fly_dev.toml"
    mv fly.toml fly_dev.toml
fi

# check if the argument is "prod"
if [ "$1" == "prod" ]; then
    # rename "fly_prod.toml" to "fly.toml"
    mv fly_prod.toml fly.toml

    # deploy using fly
    fly deploy

    # rename "fly.toml" back to "fly_prod.toml"
    mv fly.toml fly_prod.toml
fi

