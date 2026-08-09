/* Contrato común de cada escena de la VSL. */
export type SceneProps = {
  active: boolean; // la escena está en pantalla
  onAdvance: () => void; // avanzar a la siguiente escena
};
