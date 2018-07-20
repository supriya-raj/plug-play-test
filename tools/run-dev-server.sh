#!/bin/bash
rm -rf ./build

echo '-----------------------------------------'
echo 'Building scripts in [ DEVELOPMENT ] mode'
echo '-----------------------------------------'

NODE_ENV=development node tools/build/index.js --watch &
echo '\n=> Waiting for build to complete ... \n\n'

spin='-\|/'
i=0

run_server=true
lang=$LANG

while :
do
  i=$(( (i+1) %4 ))
  printf "\r${spin:$i:1}"
  if [ -d "build/javascripts" ] && [ $run_server ]; then
    sleep 5
    echo '\n--------------------------------------------------------'
    echo 'Build completed. Starting server in [ DEVELOPMENT ] mode'
    echo '--------------------------------------------------------\n'
    run_server=false
    # cp build/id-id-index.html build/index.html
    serve -s build
    break
  fi
  sleep 0.1
done

# trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
