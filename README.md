# DEMETER

1. QUICK START:

* Install https://docs.docker.com/docker-for-mac/
* Clone this repos
* `docker-compose build`
* `npm i`
* `docker-compose run web rails db:setup`
* `docker-compose run web rails db:seed:init`
* `docker-compose up`

2. INFORMATION:

* Default admin email: `admin@example.com`
* Default admin password: `123456`
* Node version: v6.x.x+ (or v7.x.x)
* NPM version: 3.x.x+
* Node package globally:

    - webpack (npm install --global webpack)
    - webpack-dev-server (npm install --global webpack-dev-server)
    - karma (npm install --global karma-cli)
    - protractor (npm install --global protractor)
    - typescript (npm install --global typescript)

3. How to build/deploy

    1. Build
    ```
    npm run build:prod
    ```
    2. Link `dist` folder to `public` folder
    ```
    ln -s dist public
    ```
    3. Copy AWS IoT certificates for `dmt-device` project
    ```
    scp -r certs root@demeter:~/workspace/demeter/dmt-device/
    ```
    4. Run docker
    ```
    nohup docker-compose -f docker-compose.test.yml up &
    ```

4. How to develop

    1. Start backend
    ```
    docker-compose up
    ```
    3. Start front-end
    ```
    npm run start
    ```

    Now try `http://localhost:3000` on your browser ;)

5. Troubleshoot

    1. Cannot `npm i`
    Try install node `v6.2.0`

    2. Cannot build with unexpected result

        - Check at least 2GB Ram needed for the build task
        - Stop docker-compose by `c stop`, `service docker stop`

    3. Cannot build due to `Module build failed: Error: ENOENT: no such file or directory, scandir '/root/workspace/demeter/node_modules/node-sass/vendor'`

        - Solution 1
            - `rm -rf node_modules`
            - `npm i`

        - Solution 2
            - `npm rebuild node-sass`

    4. Cannot test websocket from client

        Open port `9090`

        `sudo ufw allow 9090/tcp`

## Development Notes

1. Shouldnot override default Date/Time format.

Change this will make other libraries cannot work properly, ex. `sidekiq-cron` will enqueued the job to redis with the new date format, that could make the cron job cannot executed

```
Date::DATE_FORMATS[:default]="%m/%d/%Y"
Time::DATE_FORMATS[:default]="%m/%d/%Y %H:%M"
```

2. Proper way to dealing with `ngrx/store`

```
/* should avoid */
this.store.select('project')
.takeWhile((projectModel: any) => {
    return (!projectModel.loaded);
})
.subscribe((projectModel) => {
    if (projectModel.loaded) {
    this.project = projectModel.project;
    }
});
```

The subcribe method won't called when project has loaded

```
/* recommended */

/* clear state */
this.store.dispatch(new LoadedAction({}));
this.store.select('project')
.takeWhile((projectModel: any) => {
    return (typeof this.project.id === 'undefined');
})
.subscribe((projectModel) => {
    if (projectModel.project && projectModel.project.id) {
    this.project = projectModel.project;
    }
});
```

Use internal variable to check

## References

1. Install Node

    ```
    https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
    ```
2. Install anuglar-cli
    ```
    npm install -g @angular/cli
    ```