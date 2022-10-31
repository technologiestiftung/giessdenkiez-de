export const setBodyMapLayerClass = (visibleMapLayer: string): void => {
  document.body.classList.remove(
    'mapLayer-trees',
    'mapLayer-pumps',
    'mapLayer-rain'
  );
  document.body.classList.add(`mapLayer-${visibleMapLayer}`);
};
