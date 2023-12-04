export interface PumpEventInfoType {
  x: number;
  y: number;
  object?: {
    properties?:
      | {
          id: number;
          'pump:status'?: string;
          'addr:full'?: string;
          'pump:style'?: string;
          check_date?: string;
        }
      | undefined;
  };
}

interface ParsedPumpInfoType {
  id: number;
  address: string;
  check_date: string;
  status: string;
  style: string;
  x: number;
  y: number;
}

export const pumpEventInfoToState = (
  info: PumpEventInfoType
): ParsedPumpInfoType | null => {
  if (info && info.object && info.object.properties) {
    return {
      id: info.object.properties.id,
      address: info.object.properties['addr:full'] || '',
      check_date: info.object.properties['check_date'] || '',
      status: info.object.properties['pump:status'] || '',
      style: info.object.properties['pump:style'] || '',
      x: info.x,
      y: info.y,
    };
  }
  return null;
};
