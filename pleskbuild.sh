# This is a helper script to create a production build of our application 
# which can then be hosted on Plesk.

cd client
npm run build
cd ..
mkdir -p plesk_out

echo Copying client build to /plesk_out
cp -a build plesk_out

echo Copying server production files to /plesk_out
cp -a .env plesk_out
cp -a app.js plesk_out
cp -a cache.js plesk_out
cp -a external-football-api.js plesk_out
cp -a main.js plesk_out
cp -a package.json plesk_out
