import { Routes } from "@nestjs/core";
import { HelloModule } from "app/modules/hello/hello.module";
import { QRModule } from "app/modules/qr/qr.module";

export const appRoutes: Routes = [
    {
        path: process.env.SERVER_CONTEXT ? (process.env.SERVER_CONTEXT + '/api') : 'api',
        children: [
            { path: 'hello', module: HelloModule },
            { path: 'qr', module: QRModule },
        ]
    }
]