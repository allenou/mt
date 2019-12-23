yarn build

cd docs

echo 'markdown.toyou.xyz' > CNAME

git add -A
git commit -m 'Deploy'

git push origin master
