export class EnergyActivityDto {
  /**
   * Energy consumed in kilowatt-hours (kWh)
   */
  value: number;

  /**
   * Optional unit override. Defaults to kWh.
   */
  unit?: 'kWh';
}