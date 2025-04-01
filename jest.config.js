/** @type {import('ts-jest').JestConfigWithTsJest} **/
const esModules = ['@react-leaflet', 'react-leaflet'].join('|');

export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)?$": [
      "ts-jest",
      { diagnostics: { ignoreCodes: ["TS151001"] } },
    ],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Ważne dla TypeScript!
  transformIgnorePatterns: [
    "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
    "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
    "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
    `/node_modules/(?!${esModules})`,

  ],
  moduleNameMapper:{"^uuid$": "uuid"}
};
