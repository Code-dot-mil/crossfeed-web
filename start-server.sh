npx sequelize db:migrate


if [ $1 = "production" ]
then
	forever start server.js
else
	npm run develop & nodemon server.js --ignore client
fi
