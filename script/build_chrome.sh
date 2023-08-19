#!/bin/bash

echo 'Build extension for Chrome is starting...'

echo 'Build src is starting...'
npm run build

echo 'Build manifest is starting...'
cp public/chrome.manifest.json public/manifest.json

echo 'Build extension for Chrome completed.'
