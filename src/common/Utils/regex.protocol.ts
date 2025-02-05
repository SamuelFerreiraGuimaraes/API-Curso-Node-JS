// Define um protocolo (interface) para operações relacionadas a expressões regulares
export abstract class RegExProtocol {
  // Método abstrato que deve ser implementado pelas subclasses
  // Este método deve receber uma string e retornar uma string
  abstract execute(str: string): string;
}
