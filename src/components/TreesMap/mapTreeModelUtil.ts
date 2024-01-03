export const getTreeModel = (): any => {
  return [
    'case',
    ['<', ['number', ['get', 'age'], 320], 100],
    'tree-0-model',
    ['<', ['number', ['get', 'age'], 320], 200],
    'tree-2-model',
    ['<', ['number', ['get', 'age'], 320], 320],
    'tree-1-model',
    'tree-1-model',
  ];
};

export const getTreeModelScale = (): any => {
  return [
    'case',
    ['<', ['number', ['get', 'age'], 320], 100],
    [2, 2, 2],
    ['<', ['number', ['get', 'age'], 320], 200],
    [1, 1, 1],
    ['<', ['number', ['get', 'age'], 320], 320],
    [4, 4, 4],
    [4, 4, 4],
  ];
};
