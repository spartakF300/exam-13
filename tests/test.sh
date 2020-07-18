#!/bin/bash

REL_PATH=`dirname $0`
cd ${REL_PATH}
CURRENT_DIR=`pwd`

echo ${CURRENT_DIR}
cd ${CURRENT_DIR}

echo '##################'
echo '## Running test!##'
echo '##################'

echo '# API'

cd ../backend

echo '# Running fixtures'
NODE_ENV=test yarn run seed

echo '# Running API test'
pm2 start "NODE_ENV=test yarn run start" --name="caravan-api-test"

echo '# Running frontend test'
cd ../frontend
pm2 start "yarn run start:test" --name="caravan-frontend-test"

while ! nc -z localhost 3010; do
    sleep 0.1
done

echo '# Running tests'
cd ../tests
npx codeceptjs run --steps $@
EXIT_CODE=$?

echo 'Kill proccess'
pm2 kill

exit ${EXIT_CODE}