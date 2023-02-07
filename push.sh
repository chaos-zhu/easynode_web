#! /bin/sh

git add .
read -p "input commit message: " msg
git commit -m ":bulb: $msg"
# git commit -m ":bulb: update commit for shell script"
git push origin master
printf "推送成功,3秒后关闭窗口\n"
sleep 3s
# read -s -n1 -p "Press any key to close ... "
