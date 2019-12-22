lint:
	npx eslint . 

start:
	npx babel-node -- src/bin/gendiff.js

publish:
	npm publish --dry-run

test:
	npm test

test-watch:
	npm run  test -- --watch

test-coverage:
	npm test -- --coverage
