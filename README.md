# remix-gltf-viewer
<div align="center">
<img src="https://github.com/kaitok/remix-gltf-viewer/assets/5301304/e84aad43-1f7d-4fa9-b92d-a42f59ae15df" width="700"/>
</div>

## Description

This project is the final project for Harvard University's [CS50](https://pll.harvard.edu/course/cs50-introduction-computer-science). This is a simple 3D viewer designed to display glTF on the web. Users can easily upload their own glTF files to visualize 3D models, and through project creation, they can create a viewpoint of the 3D model as note.

This idea was inspired by a [underwater research project](https://suichukoukogaku.com/). In that project, researchers typically create a 3D model from a series of photographs taken during fieldwork, using a technique known as photogrammetry.
I thought it would be interesting to see if displaying the 3D models of the survey field and creating notes as observation points within them could be useful for research. Setting viewpoints within a 3D model can help with storytelling around a survey field. I believe it can be useful for various applications, including disaster investigation, mapping, construction surveys, and more.


https://github.com/kaitok/remix-gltf-viewer/assets/5301304/d5b512e9-c60c-40fc-9766-8cfdeddc8cc6

Demo data: [19th-Century Shipwreck "15377" High Resolution by BOEM Archaeology](https://sketchfab.com/BOEMArchaeology)


## Tech stack

This project is designed to run locally, using a simple authentication method based on usernames. We used the [FormStrategy](https://github.com/sergiodxa/remix-auth-form) from Remix Auth for authentication. Although passwords are encrypted, this setup is not intended for production use.
The database can be launched via Docker and is connected with Prisma.
Users can upload glTF files up to a maximum size of 1 GB, but the upload destination is a local disk.
Implemented authorization to ensure that only the author of a project can access it.

- Web framework: Remix - Full stack web framework with React
- Database: Postgres(with Docker)
- ORM: Prisma
- 3D: Three.js, React Three Fiber
- Auth: Remix auth

## Features

The project management features in this application, like those in many other apps, include the ability to create, archive, and delete projects. Uploaded glTF files can be visualized with a 3D viewer, allowing users to move the camera around. By clicking at add viewpoints, users can record the current camera position as a note.

- Manage projects (Create, Archive project)
- glTF file uploading
- Web 3D viewer with React Three Fiber
- 3D camera control
- Adding viewpoint as a note on the 3D model
- SignUp, login

## Development

### Start database

```
docker copose up -d
```

### Database setup

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

```
npm run dev
```
