export interface PumpEventInfoType {
  x: number;
  y: number;
  properties: {
    id: number;
    'pump:status'?: string;
    'addr:full'?: string;
    'pump:style'?: string;
    check_date?: string;
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
  return {
    id: info.properties['id'],
    address: info.properties['addr:full'] || '',
    check_date: info.properties['check_date'] || '',
    status: info.properties['pump:status'] || '',
    style: info.properties['pump:style'] || '',
    x: info.x,
    y: info.y,
  };
};
