#!/bin/bash

echo 'Build extension for Chrome is starting...'

echo 'Build bundles is starting...'
npm run build-prod

bash build_chrome_manifest.sh

echo 'Build extension for Chrome completed.'
