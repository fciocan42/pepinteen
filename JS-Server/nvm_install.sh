echo INSTALL NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

reset

echo
echo SOURCE PROFILE
# restart de terminal
source ~/.bashrc

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;


echo
echo INSTALL LTS
nvm install --lts

echo
echo USE LTS
nvm use --lts

echo
echo NODE VERSION
node --version

echo
echo NPM VERSION
npm -version

echo
echo POSTMAN
postmanDir=~/Downloads
postmanTar=~/Downloads/postman.tar.gz

curl https://dl.pstmn.io/download/latest/linux_64 --output $postmanTar

tar -xf $postmanTar -C $postmanDir

ln -sv $postmanDir/Postman/Postman ~/Desktop
