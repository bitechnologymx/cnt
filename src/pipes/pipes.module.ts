import { NgModule } from '@angular/core';

import { AsignacionesGridEstatusPipe } from './asignaciones-grid/asignaciones-grid-estatus';
import { AsignacionesGridFechaPipe } from './asignaciones-grid/asignaciones-grid-fecha';

@NgModule({
	declarations: [AsignacionesGridEstatusPipe,
    AsignacionesGridFechaPipe],
	imports: [],
	exports: [AsignacionesGridEstatusPipe,
    AsignacionesGridFechaPipe]
})
export class PipesModule {}
