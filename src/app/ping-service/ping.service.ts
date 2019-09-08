import {PingConfig, PingResponse, promise} from 'ping';
import {tokens} from 'typed-inject';
import {PingConsumer} from './consumers/ping.consumer';
import {CronCommand, CronJob, CronJobParameters, job} from 'cron';
import {PingServiceConfig} from './ping.service.config';

export class PingService {

    private job: CronJob;

    public static inject = tokens('config', 'consumer');
    public constructor(private config: PingServiceConfig,
                       private consumer: PingConsumer) {
        this.job = job({
            cronTime: this.config.cronTime
        } as CronJobParameters);

        this.job.addCallback(() => {
            this.config.hosts.forEach(host => {
                this.dispatchPing(host);
            });
        });

        if (this.config.isInstantStartup) {
            this.start();
        }
    }

    public start(): void {
        this.job.start();
    }

    public dispatchPing(uri: string) {
        promise.probe(uri, this.config.pingConfig).then((response: PingResponse) => {
            this.consumer.consume(response);
        });
    }

}
