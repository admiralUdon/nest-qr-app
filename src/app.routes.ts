import { Routes } from "@nestjs/core";
import { HelloModule } from "app/modules/hello/hello.module";
import { QRModule } from "app/modules/qr/qr.module";

export const appRoutes: Routes = [
    {
        path: 'api',
        children: [
            { path: 'hello', module: HelloModule },
            { path: 'qr', module: QRModule },
        ]
    }
]