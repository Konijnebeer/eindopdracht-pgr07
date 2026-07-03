export type GpxCoordinate = {
  latitude: number;
  longitude: number;
};

export function parseGpxTrack(gpx: string): GpxCoordinate[] {
  const points: GpxCoordinate[] = [];
  const trkptRegex = /<trkpt\s+([^>]*)>/g;

  let match: RegExpExecArray | null;
  while ((match = trkptRegex.exec(gpx)) !== null) {
    const attrs = match[1];
    const lat = attrs.match(/lat="(-?\d+(?:\.\d+)?)"/)?.[1];
    const lon = attrs.match(/lon="(-?\d+(?:\.\d+)?)"/)?.[1];
    if (lat && lon) {
      points.push({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
    }
  }

  return points;
}
