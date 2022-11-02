module.exports = {
  moduleNameFormatter({ pathToImportedModule }) {
    return pathToImportedModule
      .replace('./src/components/', '@components/')
      .replace('./src/common/', '@common/')
      .replace('./src/utils/', '@utils/')
      .replace('./src/state/', '@state/')
      .replace('./src/assets/', '@assets/')
      .replace(/\.ts$/gs, '');
  },
};
