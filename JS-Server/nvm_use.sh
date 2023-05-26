export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

reset

echo
echo INSTALL LTS
nvm install --lts

echo
echo USE LTS
nvm use --lts

echo
echo NODE VERSION
node -version

echo
echo NPM VERSION
npm -version
