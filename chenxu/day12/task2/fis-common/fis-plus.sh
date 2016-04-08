#!/bin/bash

processDir=$1
outputDir="output_tmp"

## 目标地址，stage prod
target=$2

targetFile="/config/common-map.json"

# tmp 环境变量
export FIS_TEMP_DIR=${processDir}

cd ${processDir}

mkdir ${outputDir}

cp fis-conf.js fis-conf-runtime.js

if [[ $target = 'stage' ]];then
    sed -ig  's/http:\/\/a.t6.zbj.com/http:\/\/a.zhubajie.la/g' fis-conf-runtime.js
fi

if [[ $target = 'prod' ]];then
    sed -ig  's/http:\/\/a.t6.zbj.com/http:\/\/a.zbjimg.com/g' fis-conf-runtime.js
fi

rk release -pmoDd ./${outputDir} -f ./fis-conf-runtime.js



if [ $? -eq 0 ];then
	echo -e 'fisp compile complete'
	exit 0
else
	echo -e 'fisp compile failed'
	exit 1
fi
