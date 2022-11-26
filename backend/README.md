------------------Ejercicio5-----------------

data.js
![image](https://user-images.githubusercontent.com/55513309/162237107-13f2871a-5f41-4b39-a3c1-ac2e30b08d46.png)
 
 

GET, "/users": devuelve una lista con el nombre de todos los usuarios.
 ![image](https://user-images.githubusercontent.com/55513309/162237124-80c532a8-a94b-4d93-b02e-796fd1a21841.png)

POST, "/login": recibe el usuario y contraseña y realiza la autenticación. 
 ![image](https://user-images.githubusercontent.com/55513309/162237156-0ff40d60-41d1-41e1-977e-117f1105dcc5.png)

GET, "/:user/notes": devuelve la lista de notas del usuario.
:user is userName
 ![image](https://user-images.githubusercontent.com/55513309/162237186-c408a7ef-0cd7-4a3b-a29d-fce7b7f6dbcb.png)

POST: "/:user/notes": crea una nueva nota en el usuario. Los datos se envían en el body.
:user is userName.
 ![image](https://user-images.githubusercontent.com/55513309/162237212-aa4b38f5-8d04-41ff-8099-a6ee7292f482.png)

PUT, "/:user/notes/:note": edita una nota. Los datos se envían en el body.
:user is userName.
:note is id of notes.
 ![image](https://user-images.githubusercontent.com/55513309/162237231-a90a4f70-8233-45ba-9d66-30812961b0e6.png)

DELETE, "/:user/notes/:note": elimina una nota.
:user is userName.
:note is id of notes.
![image](https://user-images.githubusercontent.com/55513309/162237252-1a3d1824-d503-4c23-86d4-cedb32bbccc4.png)

------------------Ejercicio7-----------------

GET, "/users": devuelve una lista con el nombre de todos los usuarios.
![image](https://user-images.githubusercontent.com/55513309/165366370-1c863769-31fe-4a65-89d0-045916ef9497.png)

POST, "/login": recibe el usuario y contraseña y realiza la autenticación. 
![image](https://user-images.githubusercontent.com/55513309/165367093-1557939e-c306-47b8-b6e8-c7abc1c00fac.png)

GET, "/:user/notes": devuelve la lista de notas del usuario.
:user is userName
![image](https://user-images.githubusercontent.com/55513309/165371775-d31ede67-0913-4683-8c20-5099874fe395.png)

POST: "/:user/notes": crea una nueva nota en el usuario. Los datos se envían en el body.
:user is userName.
![image](https://user-images.githubusercontent.com/55513309/165371666-aa2d86d1-d0c3-4598-8d30-eac5f0ed281e.png)

PUT, "/:user/notes/:note": edita una nota. Los datos se envían en el body.
:user is userName.
:note is id of notes.
![image](https://user-images.githubusercontent.com/55513309/165377580-fdfa1771-8c3b-464c-97c1-04114b149010.png)
![image](https://user-images.githubusercontent.com/55513309/165377642-2cb2390f-cd54-4dc3-b4b0-2852458c3ade.png)

DELETE, "/:user/notes/:note": elimina una nota.
:user is userName.
:note is id of notes.
![image](https://user-images.githubusercontent.com/55513309/165378492-9a3280d6-c631-4c31-bcbc-23a50613ffe8.png)

