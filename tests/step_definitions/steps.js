const { I } = inject();

Given('я залогинен как пользователь:', table => {
	I.amOnPage('/login');

	const tableData = table.parse().rawData;

	tableData.forEach(row => {
		I.fillField(row[0], row[1]);
	});

	I.click("#login");

});
When('я нахожусь на странице', () => {
	I.amOnPage('/addPlace');
});


When('я нахожусь на странице', () => {
	I.amOnPage('/addPlace');
	I.wait(2)
});
When('я заполняю формы добавления:', table => {
	const tableData = table.parse().rawData;

	tableData.forEach(row => {
		I.fillField(row[0], row[1]);
	});
	I.click('I agree')
});
When('я нажму на кнопку {string}', (btnName) => {
	I.click(btnName);
});
Then('я вижу текст {string}', (text) => {
	I.see(text)
});