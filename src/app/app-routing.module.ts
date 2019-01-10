import { NgModule } from '@angular/core';

import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { CreateCharacterComponent } from './create-character/create-character.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'characters',
    component: TabsComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: ':side', component: ListComponent }
    ]
  },
  { path: 'new-character', component: CreateCharacterComponent },
  { path: '**', redirectTo: '/characters' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [AppRoutingModule]
})
export class AppRoutingModule {}
