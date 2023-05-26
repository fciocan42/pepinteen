
## Postman
Se poate instala de [aici](https://www.postman.com/downloads/)

Dupa ce este instalat cu success importati colectiile de endpointuri (fisierele PepinTEEN-JS-Server.postman_collection.json si PepinTeen2023.postman_collection.json) dupa cum urmeaza:

In Postman in stanga sus aveti butonul import.
![[Screenshot 2023-05-12 at 08.59.02.png]]

Selectati fisierul pe care doriti sa il importati.
![[Screenshot 2023-05-12 at 09.00.05.png]]

Apasati import
![[Screenshot 2023-05-12 at 09.00.43.png]]

Repetati si pentru cel de al doilea fisiser. Dupa import o sa aveti in stanga o structura similara cu cea din screenshot.
![[Screenshot 2023-05-12 at 09.01.40.png]]


### Node & Npm

### Linux / Mac OS
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# restart de terminal
source ~/.bash_profile


nvm install --lts

nvm use --lts

node –version

npm –version
```

### Windows

Descarca nvm de aici si finalizeaza instalarea.
https://github.com/coreybutler/nvm-windows/releases/download/1.1.11/nvm-setup.exe

Dupa ce a terminat de instalad deschide Windows Power Shell si ruleaza urmatoarele comenzi:
```bash

nvm -v

nvm install --lts

nvm use --lts

node –version

npm –version

```


## Structura fisiere

- Postman (colectiile publice de apiuri si colectia proiectului)
- hello-world - contine doar fisierul index.js pentru demoul din ppt

Proiect:
- PepinJSServer - proiectul cu rezolvarile complete 
- PepinJSServerSkel - proiectul cu TODO-uri pentru ateliere

Pentru a porni serverul rulati urmatoarele comenzi:
```bash
npm install
node app.js
# Server is running on port 3001 
```
