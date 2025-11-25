/**
 * Entidad de dominio Country.
 * Representa la información mínima que queremos manejar en la app,
 * independientemente del formato de la API externa.
 */

export class Country {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly region: string,
    public readonly capital: string,
  ) {}
}
