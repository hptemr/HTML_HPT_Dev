import { Routes } from '@angular/router';
import { SamplePageComponent } from 'src/app/component/pages/sample-page/sample-page.component';

export const dashData: Routes = [

    {
        path: 'pages',
        data: {
            title: "sample-page",
            breadcrumb: "sample-page",

        },
        loadChildren: () => import('../../component/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'sample-page',
        component: SamplePageComponent,
        data: {
            title: "Sample-page",
            breadcrumb: "Sample-page",
        }
    }
]