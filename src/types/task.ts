export interface Task {
  id: string;
  titulo: string;
  categoria: string;
  completada: boolean;
  fechaCreacion: string;
}

export type RootTabParamList = {
  Inicio: undefined;
  Tareas: undefined;
  Ajustes: undefined;
};