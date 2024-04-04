import { Routes } from '@angular/router'; 

export const dashData: Routes = [

    {
        path: 'pages',
        data: {
            title: "sample-page",
            breadcrumb: "sample-page",

        }, 
    },
    {
        path: 'sample-page', 
        data: {
            title: "Sample-page",
            breadcrumb: "Sample-page",
        }
    }
]