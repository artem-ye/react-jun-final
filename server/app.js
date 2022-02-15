const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');

const initDataBase = require('./startUp/initDataBase');
const apiRoutes = require('./routes/index');

const { PORT, MONGO_URI } = getConfig();

async function start() {
	const app = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use('/api', apiRoutes);

	try {
		mongoose.connection.once('open', () => {
			initDataBase();
		});
		await mongoose.connect(MONGO_URI);
		app.listen(PORT, console.log('Server started on port:', PORT, 'db connected'));
	} catch (err) {
		console.log(chalk.red(err.message));
	}
}

function getConfig() {
	const PORT = config.get('port') ?? 3000;
	const MONGO_URI = config.get('mongoUri') ?? '';
	return { PORT, MONGO_URI };
}

start();
