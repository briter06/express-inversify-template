/** @type {import('ts-jest/<rootDir>/srctypes').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: [".d.ts", ".js", "/node_modules/", "/dist/"],
    moduleNameMapper: {
        "^~(.*)$": "<rootDir>/src$1",
        "^@models(.*)$": "<rootDir>/src/models$1",
        "^@parser(.*)$": "<rootDir>/src/parser$1",
        "^@services(.*)$": "<rootDir>/src/services$1",
    },
    coverageDirectory: "test/coverage",
}
