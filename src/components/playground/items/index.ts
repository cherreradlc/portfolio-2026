import type { ComponentType } from "react";
import Acordeon from "./Acordeon";
import Balancin from "./Balancin";
import Burbujas from "./Burbujas";
import Carrera from "./Carrera";
import Buscar from "./Buscar";
import Carrito from "./Carrito";
import Columpio from "./Columpio";
import Confeti from "./Confeti";
import Contador from "./Contador";
import Contrasena from "./Contrasena";
import Copiar from "./Copiar";
import Descarga from "./Descarga";
import Deslizar from "./Deslizar";
import DiaNoche from "./DiaNoche";
import Esqueleto from "./Esqueleto";
import Estela from "./Estela";
import Estrellas from "./Estrellas";
import Gelatina from "./Gelatina";
import Gooey from "./Gooey";
import LetrasHuyen from "./LetrasHuyen";
import Magnetico from "./Magnetico";
import Maquina from "./Maquina";
import MeGusta from "./MeGusta";
import MenuJuegos from "./MenuJuegos";
import Morph from "./Morph";
import Onda from "./Onda";
import Pelota from "./Pelota";
import Refrescar from "./Refrescar";
import Reordenar from "./Reordenar";
import Segmentado from "./Segmentado";
import Tarea from "./Tarea";
import Tarjeta3D from "./Tarjeta3D";
import TextoRueda from "./TextoRueda";
import TextoScroll from "./TextoScroll";
import Toast from "./Toast";
import Tooltip from "./Tooltip";
import Validacion from "./Validacion";
import Volumen from "./Volumen";
import Voltear from "./Voltear";

/** The live component for each playground slug (see data/playground.ts). */
export const ITEMS: Record<string, ComponentType> = {
  carrera: Carrera,
  "me-gusta": MeGusta,
  "dia-noche": DiaNoche,
  gelatina: Gelatina,
  "texto-rueda": TextoRueda,
  menu: MenuJuegos,
  magnetico: Magnetico,
  volumen: Volumen,
  tarea: Tarea,
  estrellas: Estrellas,
  copiar: Copiar,
  voltear: Voltear,
  segmentado: Segmentado,
  descarga: Descarga,
  pelota: Pelota,
  contador: Contador,
  acordeon: Acordeon,
  onda: Onda,
  tooltip: Tooltip,
  confeti: Confeti,
  buscar: Buscar,
  validacion: Validacion,
  contrasena: Contrasena,
  toast: Toast,
  carrito: Carrito,
  refrescar: Refrescar,
  esqueleto: Esqueleto,
  deslizar: Deslizar,
  reordenar: Reordenar,
  columpio: Columpio,
  burbujas: Burbujas,
  maquina: Maquina,
  "letras-huyen": LetrasHuyen,
  "texto-scroll": TextoScroll,
  estela: Estela,
  "tarjeta-3d": Tarjeta3D,
  gooey: Gooey,
  morph: Morph,
  balancin: Balancin,
};
