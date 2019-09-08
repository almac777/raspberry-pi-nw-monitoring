import {PingConfig} from 'ping';

export class PingServiceConfig {
    isInstantStartup: boolean = false;
    cronTime: string = '0 * * * * *';
    pingConfig = {
        timeout: 60,
        extra: [
            '-i 2',
            '-c 30'
        ]
    } as PingConfig;
    hosts: string[] = [
        'google.com'
    ];
}
