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

3. How to build/deploy

    1. Build
    ```
    ./node_modules/.bin/ng build --prod --aot
    ```
    2. Link `dist` folder to `public` folder
    ```
    ln -s dist public
    ```
    3. Run docker
    ```
    docker-compose -f docker-compose.test.yml up
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
## References

1. Install Node

    ```
    https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
    ```
2. Install anuglar-cli
    ```
    npm install -g @angular/cli
    ```