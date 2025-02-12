'use strict';

const path = require('path');
const replaceBackslashes = require('../testUtils/replaceBackslashes');
const standalone = require('../standalone');

const fixturesPath = replaceBackslashes(path.join(__dirname, 'fixtures'));

it('standalone with input css and `maxWarnings`', async () => {
	const config = {
		quiet: true,
		rules: {
			'block-no-empty': true,
		},
	};

	const { maxWarningsExceeded } = await standalone({
		code: 'a {}',
		config,
		maxWarnings: 0,
	});

	expect(maxWarningsExceeded).toMatchObject({ maxWarnings: 0, foundWarnings: 1 });
});

it('standalone with input file(s) and `maxWarnings`', async () => {
	const config = {
		quiet: true,
		rules: {
			'block-no-empty': true,
		},
	};

	const { maxWarningsExceeded } = await standalone({
		files: replaceBackslashes(path.join(fixturesPath, 'empty-block.css')),
		config,
		maxWarnings: 0,
	});

	expect(maxWarningsExceeded).toMatchObject({ maxWarnings: 0, foundWarnings: 1 });
});
