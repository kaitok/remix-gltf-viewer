# gltf-viewer

## Description
This project is final project for Harvard University's CS50.
simple web viewer for 3d models.
You can visualise 3d models on the web by uploading glTF files.

It is also possible to write notes in the 3d file by creating a project. This idea was inspired by the deep-sea remains research project. They usually use a technique called photogrammetry to create a 3D model of the survey field from a series of photographs during fieldwork. 
The idea was created to see if viewing and making notes on 3D models of the survey field could be used in research.


## Technical stack
- Web framework: Remix - Full stack web framework with React
- Database: Postgres(with Docker)
- ORM: Prisma 
- 3D viewer: three.js, React Three Fiber


## Features
- Create project, archive and restore(Multiple selection for delete projects)
- glTF file uploading
- Web 3d viewer with React Three Fiber
- 3d camera control
- adding annotation and note on 3D model

## Project Demo


## Development

### Start database

```sh
docker copose up -d 
```

### Database setup
create database in local postgresql 
database name: gltf-viewer

Crete env file and setup DATABASE_URL to connect postgresql
```
cp .env.sample .env
```

### Run migration

```
npx prisma migrate dev
```

### Run server

```sh
npm run dev
```
