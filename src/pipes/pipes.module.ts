import { NgModule } from '@angular/core';

import { AsignacionesGridEstatusClassPipe } from './asignaciones-grid/asignaciones-grid-estatus-class';
import { AsignacionesGridEstatusTextPipe } from './asignaciones-grid/asignaciones-grid-estatus-text';
import { AsignacionesGridFechaPipe } from './asignaciones-grid/asignaciones-grid-fecha';
import { AsignacionesGridRandomColorPipe } from './asignaciones-grid/asignaciones-grid-random-color';
import { AsignacionesGridEtapaTextPipe } from './asignaciones-grid/asignaciones-grid-etapa-text';

import { ActividadUsuarioPipe } from './actividad-usuario/actividad-usuario';

import { TrimTextPipe } from './common/trim-text';

@NgModule({
	declarations: [
		AsignacionesGridEstatusTextPipe,
		AsignacionesGridEstatusClassPipe,
    AsignacionesGridFechaPipe,
		AsignacionesGridRandomColorPipe,
		AsignacionesGridEtapaTextPipe,
    ActividadUsuarioPipe,
		TrimTextPipe
	],
	imports: [],
	exports: [
		AsignacionesGridEstatusTextPipe,
		AsignacionesGridEstatusClassPipe,
    AsignacionesGridFechaPipe,
		AsignacionesGridRandomColorPipe,
		AsignacionesGridEtapaTextPipe,
    ActividadUsuarioPipe,
		TrimTextPipe
	]
})
export class PipesModule {}
