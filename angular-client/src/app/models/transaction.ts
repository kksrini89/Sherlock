export interface RootObject {
  id: string;
  index: number;
  age: number;
  name: string;
  email: string;
  phone: string;
  connectionInfo: ConnectionInfo;
  geoInfo: GeoInfo;
  childrens: Children[];
}

export interface Children {
  id: string;
  index: number;
  age: number;
  name: string;
  email: string;
  phone: string;
  connectionInfo: ConnectionInfo;
  geoInfo: GeoInfo;
}

export interface GeoInfo {
  latitude: number;
  longitude: number;
}

export interface ConnectionInfo {
  type: string;
  confidence: number;
}

export default ConnectionInfo;
