const { NULL } = require("mysql/lib/protocol/constants/types");
const db = require("./db");

class Controller {
	async createClient(req, res) {
		let { full_name, agreement, date, phone, address, model_id } = req.body;
		await db.query(
			`INSERT INTO \`Клиент\`(\`ФИО\`, \`Номер договора\`, \`Дата покупки\`, \`Телефон\`, \`Адрес\`, \`Код модели\`) VALUES
            (?, ?, ?, ?, ?, ?)`,
			[full_name, agreement, date, phone, address, model_id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateClient(req, res) {
		const agreement = +req.params.id;
		let { date, phone, address, model_id } = req.body;
		await db.query(
			`UPDATE \`Клиент\` SET
			\`Дата покупки\` = ?, \`Телефон\` = ?, \`Адрес\` = ?, \`Код модели\` = ?
            WHERE \`Номер договора\` = ?`,
			[date, phone, address, model_id, agreement],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteClient(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM \`Клиент\` WHERE \`Номер договора\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getClients(req, res) {
		await db.query(
			`SELECT \`ФИО\` as full_name, \`Номер договора\` as agreement, \`Дата покупки\` as date, \`Телефон\` as phone, \`Адрес\` as address, \`Модель автомобиля\`.\`Наименование модели\` as model
            FROM \`Клиент\`
			LEFT JOIN \`Модель автомобиля\` USING(\`Код модели\`)`,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getClient(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT \`ФИО\` as full_name, \`Номер договора\` as agreement, \`Дата покупки\` as date, \`Телефон\` as phone, \`Адрес\` as address, \`Код модели\` as model_id
            FROM \`Клиент\`
			WHERE \`Номер договора\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createProvider(req, res) {
		const { provider_id, phone, email, name, address } = req.body;
		await db.query(
			`INSERT INTO \`Поставщик\` (\`Код фирмы\`, \`Телефон\`, \`E-mail\`, \`Название фирмы\`, \`Адрес веб-сайта\`) VALUES 
			(?, ?, ?, ?, ?)`,
			[provider_id, phone, email, name, address],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateProvider(req, res) {
		const id = +req.params.id;
		const { phone, email, name, address } = req.body;
		await db.query(
			`UPDATE \`Поставщик\` SET 
			\`Телефон\` = ?, \`E-mail\` = ?, \`Название фирмы\` = ?, \`Адрес веб-сайта\` = ?
			WHERE \`Код фирмы\` = ?`,
			[phone, email, name, address, id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async deleteProvider(req, res) {
		const id = +req.params.id;
		db.query(
			`DELETE FROM \`Поставщик\` WHERE \`Код фирмы\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getProviders(req, res) {
		await db.query(
			`SELECT \`Код фирмы\` as provider_id, \`Телефон\` as phone, \`E-mail\` as email, \`Название фирмы\` as name, \`Адрес веб-сайта\` as address FROM \`Поставщик\``,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getProvider(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT \`Код фирмы\` as provider_id, \`Телефон\` as phone, \`E-mail\` as email, \`Название фирмы\` as name, \`Адрес веб-сайта\` as address
			FROM \`Поставщик\`
			WHERE \`Код фирмы\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createModel(req, res) {
		const {
			model_id,
			name,
			color,
			upholstery,
			power,
			doors,
			transmission,
			provider_id,
			full_name,
			year,
			cost,
			presale,
			transport_cost,
		} = req.body;

		await db.query(
			`INSERT INTO \`Прейскурант цен\` (\`Код модели\`, \`Год выпуска\`, \`Цена\`, \`Предпродажная подготовка\`, \`Транспортные издержки\`) VALUES
			(?, ?, ?, ?, ?)`,
			[model_id, year, cost, presale, transport_cost],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				db.query(
					`INSERT INTO \`Модель автомобиля\` (\`Код модели\`, \`Наименование модели\`, \`Цвет\`, \`Обивка\`, \`Мощность двигателя\`, \`Количество дверей\`, \`Коробка передач\`, \`Поставщик_Код фирмы\`, \`Клиент_ФИО\`, \`Прейскурант цен_Код модели\`) VALUES
					(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
					[
						model_id,
						name,
						color,
						upholstery,
						power,
						doors,
						transmission,
						provider_id,
						full_name,
						model_id,
					],
					(err, result, field) => {
						if (err) {
							console.log(err);
							return res.status(500).json({ message: "Ошибка" });
						}
						res.json(result);
					}
				);
			}
		);
	}
	async updateModel(req, res) {
		const id = +req.params.id;
		const {
			name,
			color,
			upholstery,
			power,
			doors,
			transmission,
			provider_id,
			full_name,
			year,
			cost,
			presale,
			transport_cost,
		} = req.body;
		await db.query(
			`UPDATE \`Модель автомобиля\` SET
			\`Наименование модели\` = ?, 
			\`Цвет\` = ?,
			\`Обивка\` = ?,
			\`Мощность двигателя\` = ?,
			\`Количество дверей\` = ?,
			\`Коробка передач\` = ?,
			\`Поставщик_Код фирмы\` = ?, 
			\`Клиент_ФИО\` = ?
            WHERE \`Код модели\` = ?`,
			[
				name,
				color,
				upholstery,
				power,
				doors,
				transmission,
				provider_id,
				full_name,
				id,
			],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				db.query(
					`UPDATE \`Прейскурант цен\` SET
					\`Год выпуска\` = ?, \`Цена\` = ?, \`Предпродажная подготовка\` = ?, \`Транспортные издержки\` = ?
					WHERE \`Код модели\` = ?`,
					[year, cost, presale, transport_cost, id],
					(err, result, field) => {
						if (err) {
							console.log(err);
							return res.status(500).json({ message: "Ошибка" });
						}
						res.json(result);
					}
				);
			}
		);
	}
	async deleteModel(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM \`Модель автомобиля\` WHERE \`Код модели\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				db.query(
					`DELETE FROM \`Прейскурант цен\` WHERE \`Код модели\` = ?`,
					[id],
					(err, result, field) => {
						if (err) {
							console.log(err);
							return res.status(500).json({ message: "Ошибка" });
						}
						res.json(result);
					}
				);
			}
		);
	}
	async getModels(req, res) {
		await db.query(
			`SELECT 
			\`Модель автомобиля\`.\`Код модели\` as model_id,
			\`Наименование модели\` as name, 
			\`Цвет\` as color,
			\`Обивка\` as upholstery,
			\`Мощность двигателя\` as power,
			\`Количество дверей\` as doors,
			\`Коробка передач\` as transmission,
			\`Название фирмы\` as provider, 
			\`Клиент_ФИО\` as full_name,
			\`Год выпуска\` as year,
			\`Цена\` as cost,
			\`Предпродажная подготовка\` as presale,
			\`Транспортные издержки\` as transport_cost
			FROM \`Модель автомобиля\`
			LEFT JOIN \`Поставщик\` ON \`Код фирмы\` = \`Поставщик_Код фирмы\`
			LEFT JOIN \`Клиент\` ON \`ФИО\` = \`Клиент_ФИО\`
			LEFT JOIN \`Прейскурант цен\` ON \`Модель автомобиля\`.\`Код модели\` = \`Прейскурант цен\`.\`Код модели\``,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getModel(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT 
			\`Модель автомобиля\`.\`Код модели\` as model_id,
			\`Наименование модели\` as name, 
			\`Цвет\` as color,
			\`Обивка\` as upholstery,
			\`Мощность двигателя\` as power,
			\`Количество дверей\` as doors,
			\`Коробка передач\` as transmission,
			\`Поставщик_Код фирмы\` as provider_id, 
			\`Клиент_ФИО\` as full_name,
			\`Год выпуска\` as year,
			\`Цена\` as cost,
			\`Предпродажная подготовка\` as presale,
			\`Транспортные издержки\` as transport_cost
			FROM \`Модель автомобиля\`
			LEFT JOIN \`Прейскурант цен\` ON \`Модель автомобиля\`.\`Код модели\` = \`Прейскурант цен\`.\`Код модели\`
			WHERE \`Модель автомобиля\`.\`Код модели\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createPrice(req, res) {
		const { name } = req.body;
		await db.query(
			`INSERT INTO \`Прейскурант цен\` (\`Код модели\`, \`Год выпуска\`, \`Цена\`, \`Предпродажная подготовка\`, \`Транспортные издержки\`) VALUES
            (?, ?, ?, ?, ?)`,
			[name],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updatePrice(req, res) {
		const id = +req.params.id;
		const { year, cost, pre_sale, transport_cost } = req.body;
		await db.query(
			`UPDATE \`Прейскурант цен\` SET
			\`Год выпуска\` = ?, \`Цена\` = ?, \`Предпродажная подготовка\` = ?, \`Транспортные издержки\` = ?
            WHERE \`Код модели\` = ?`,
			[year, cost, pre_sale, transport_cost, id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deletePrice(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM \`Прейскурант цен\` WHERE \`Код модели\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getPrices(req, res) {
		await db.query(
			`SELECT * FROM \`Прейскурант цен\``,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getPrice(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT * FROM \`Прейскурант цен\` WHERE \`Код модели\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
}

module.exports = new Controller();
