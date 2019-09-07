import {PingConfig} from 'ping';

export class PingServiceConfig {
    isInstantStartup: boolean = false;
    cronTime: string = '0 * * * * *';
    pingConfig = {
        timeout: 60,
        extra: [
            // WARNING: -i 2 may not work in other platform like window - check platform first <3
            '-i 2',
            '-c 30'
        ]
    } as PingConfig;
    hosts: string[] = [
        'google.com'
    ];
}
