export class TransportActivityDto {
  /**
   * Freight transported in tonne-kilometres (t-km)
   */
  value: number;

  /**
   * Optional unit override. Defaults to t-km.
   */
  unit?: 't-km';
}