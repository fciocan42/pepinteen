echo INSTALL NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

reset

echo
echo SOURCE PROFILE
# restart de terminal
source ~/.bash_profile

echo
echo INSTALL LTS
nvm install --lts

echo
echo USE LTS
nvm use --lts

echo
echo NODE VERSION
node –version

echo
echo NPM VERSION
npm –version
