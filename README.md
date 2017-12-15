# DEMETER

This project consist of: 

* Front-end Angular 4: Demeter Family, Demeter Corp, Demeter Admin
* Rails Restful API: Demeter API

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

    5. Cannot send email due to database connection

        - Check if there is any busy job(s) with `http://demeter.vn/sidekiq/busy`
        - Check worker service's logs by `docker logs 84cbe05344b0 -f`
        - The cause might come from `ActiveRecord::ConnectionTimeoutError could not obtain a database connection within 5.000`. Try to increase the database connection's pool

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

3. Style a form on admin side
```
    > .smart-form
        > .well
            > .row
                > fieldset
                    > .col.col-6
```

4. `Form submission canceled because the form is not connected`

Add `type="button"`

5. Expose localhost to network for mobile testing

Edit `package.json`

```
"webpack-dev-server": "node --max_old_space_size=4096 node_modules/webpack-dev-server/bin/webpack-dev-server.js --host 0.0.0.0 --public 192.168.1.113:3000",
```

6. 

TODO
`mobile-register.component.ts`
```
ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'true'. Current value: 'false'.
```

## References

1. Install Node

    ```
    https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
    ```
2. Install anuglar-cli
    ```
    npm install -g @angular/cli
    ```
3. How to debug
    ```
    c stop web
    c run --service-ports web
    ```
4. How to backup db
    ```
    docker exec -u <your_postgres_user> <postgres_container_name> pg_dump <database_name_here> > db.dump
    ```
    ```
    docker exec -u postgres demeter_db_1 pg_dump demeter_development > db.dump
    ```
    ```
    scp -r root@demeter_staging:/root/workspace/db.dump ~/Desktop/db.dump
    ```
5. How to restore db
    ```
    c run db
    ```
    ```
    docker exec -u postgres demeter_db_1 psql -c 'create database demeter_development'
    ```
    ```
    docker exec -u postgres demeter_db_1 psql -d demeter_development -f /rails/db-2.dump
    ```
6. Memory leaking troubleshooting

    Write dump file
    ```
    rbtrace -p 20 -e 'Thread.new{GC.start;require "objspace";io=File.open("/tmp/ruby-heap.dump", "w"); ObjectSpace.dump_all(output:io); io.close}'
    ```

    Garbage Collector's current state
    ```
    rbtrace -p 6744 -e 'GC.stat'
    ```