echo INSTALL NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

reset

echo
echo SOURCE PROFILE
# restart de terminal
source ~/.bashrc

reset
bash nvm_use.sh
