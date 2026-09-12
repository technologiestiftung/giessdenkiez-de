import { expect, test } from "vitest";
import { useMapConstants } from "../../src/components/map/hooks/use-map-constants";

test("pumpUpdateLink generates correct MapComplete drinking water URL", () => {
  const { pumpUpdateLink } = useMapConstants();
  
  const id = 11053702410;
  const lat = 52.4727;
  const lng = 13.4459;

  const expectedUrl = "https://mapcomplete.org/drinking_water?z=15.1&lat=52.4727&lon=13.4459#node/11053702410";
  
  expect(pumpUpdateLink(id, lat, lng)).toBe(expectedUrl);
});