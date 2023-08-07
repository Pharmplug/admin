# Osupa_dashboard

This is repository holds the code for the Admin panel, this application is build using Typescript and Angular version 14.0.3.

**Follow these instructions to build**

You will need to install Angular CLI and have Node installed on your machine to run this project.

[Node JS](https://nodejs.org/en/) can be downloaded from [here](https://nodejs.org/en/)

## Getting started

1. Install Angular

```shell
`npm install -g @angular/cli@14`
```

2. Install packages
3. Run project

#### Run this command to install all packages.

```shell
`yarn install`
```

or

```shell
`npm install`
```

#### To start the application Run this command

```shell
 `yarn start`
```

or

```shell
`npm start`
```

run with PM2

```shell
pm2 start npm --start
```

save it

```shell
pm2 save
```


Update required config under `environments/environment.ts`directory for testnet,

For production use `environments/environment.prod.ts`
to run on local use

#### for production build

1. use `yarn build` for production build
2. Upload `build` directory content to apache virtual host directory.
