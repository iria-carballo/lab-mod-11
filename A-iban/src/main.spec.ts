import { extraerDatosIban } from "./gestionar-iban";
describe("extraerDatosIban", () => {
  test.each([
    [
      "ES21 1465 0100 72 2030876293",
      "ES21",
      "1465",
      "0100",
      "72",
      "2030876293",
    ],
    ["ES2114650100722030876293", "ES21", "1465", "0100", "72", "2030876293"],
    [
      "ES21-1465-0100-72-2030876293",
      "ES21",
      "1465",
      "0100",
      "72",
      "2030876293",
    ],
    ["ES6621000418401234567891", "ES66", "2100", "0418", "40", "1234567891"],
  ])(
    "Para el número de cuenta %p,  debería devolver el un objeto con %p,%p,%p,%p y %p ",
    (
      valor: string,
      pais: string,
      banco: string,
      sucursal: string,
      control: string,
      cuenta: string
    ) => {
      const desglose = {
        pais,
        banco,
        sucursal,
        control,
        cuenta,
      };
      expect(extraerDatosIban(valor)).toEqual(desglose);
    }
  );
});
