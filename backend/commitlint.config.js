module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // type must be one of the conventional commit types
        'type-enum': [
            2,
            'always',
            [
                'feat',     // new feature
                'fix',      // bug fix
                'docs',     // documentation
                'style',    // formatting, missing semi-colons, etc.
                'refactor', // code change that neither fixes a bug nor adds a feature
                'perf',     // performance improvement
                'test',     // adding missing tests
                'build',    // build system or external deps
                'ci',       // CI configuration
                'chore',    // other changes that don't modify src or test
                'revert',   // revert a previous commit
            ],
        ],
        // subject must not be empty
        'subject-empty': [2, 'never'],
        // type must not be empty
        'type-empty': [2, 'never'],
        // subject max length
        'subject-max-length': [2, 'always', 100],
    },
};
