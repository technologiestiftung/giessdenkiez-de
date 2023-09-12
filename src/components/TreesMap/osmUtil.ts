export const getOSMEditorURL = ({
  nodeId,
  zoom,
  lat,
  lon,
}: {
  nodeId: number;
  zoom?: number;
  lat?: number;
  lon?: number;
}): string => {
  const mapcompleteUrl = 'https://mapcomplete.org';
  const params = new URLSearchParams();
  params.set(
    'userlayout',
    'https://raw.githubusercontent.com/technologiestiftung/MapComplete-ThemeHelper/024ef9134987e0ead34f261a6270d5572c4d31a4/OSM-Berlin-Themes/man_made-walter_well-status-checker/theme.json'
  );

  params.set('z', `${zoom ? zoom : 18}`);

  if (lat && lon) {
    params.set('lat', `${lat}`);
    params.set('lon', `${lon}`);
  }

  params.set('language', 'de');
  const selectedPump = `#node/${nodeId}`;
  return `${mapcompleteUrl}?${params.toString()}${selectedPump}`;
};
