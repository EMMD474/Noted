# !/bash

# start setup
# check if package.json present
if [ ! -f package.json ]; then
    echo "package.json not found"
    exit 1
fi

# install dependencies
pnpm install

# generate prisma client
npx prisma generate

# run server
./run.sh