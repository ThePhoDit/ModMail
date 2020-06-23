module.exports = {
	'env': {
		'es6': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 2017,
		'sourceType': 'module',
		'ecmaFeatures': {
			'modules': true
		}
	},
	'plugins': [
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'error',
			'tab',
			{
				"SwitchCase": 1
			}
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'curly': [
			'error',
			'multi'
		],
		'@typescript-eslint/no-explicit-any': [
			'error',
			{
				'ignoreRestArgs': true
			}
		],
		'no-trailing-spaces': [
			'error'
		],
		'@typescript-eslint/indent': [
			'error',
			'tab',
			{
				"SwitchCase": 1
			}
		],
		'@typescript-eslint/array-type': [
			'error',
			{
				'default': 'array',
				'readonly': 'array'
			}
		],
		'@typescript-eslint/consistent-type-assertions': [
			'error',
			{
				'assertionStyle': 'as',
				'objectLiteralTypeAssertions': 'allow'
			}
		],
		'@typescript-eslint/explicit-function-return-type': [
			'off'
		],
		'@typescript-eslint/no-non-null-assertion': [
			'off'
		]
	}
};