export const getOSMEditorURL = (nodeId: number): string => {
  const mapcompleteUrl = 'https://mapcomplete.osm.be/theme';
  const params = new URLSearchParams();
  params.set(
    'userlayout',
    'https://tordans.github.io/MapComplete-ThemeHelper/OSM-Berlin-Themes/man_made-walter_well-status-checker/theme.json'
  );
  params.set('language', 'de');
  const selectedPump = `#node/${nodeId}`;
  return `${mapcompleteUrl}?${params.toString()}${selectedPump}`;
};
