#!/bin/bash

## declare an array variable
declare -a arr=("cloud/logger" "cloud/datasync" "cloud/passportauth" "client/datasync-client" "client/wfm")

## now loop through the above array
for i in "${arr[@]}"
do
	echo "$i"
	# get the github files and copy to directory
	wget https://raw.githubusercontent.com/feedhenry-raincatcher/raincatcher-core/master/${i}/example/index.ts -P core/${i}/example

	# append tag to start and end of file
	echo '// end::allfile[]' >> core/${i}/example/index.ts
	echo '// tag::allfile[]' | cat - core/${i}/example/index.ts > temp && mv temp core/${i}/example/index.ts

	# compile typescrpt to get js files
	tsc core/${i}/example/index.ts

	# change file name of ts files
	mv core/${i}/example/index.ts core/${i}/example/index

done

# You can access them using echo "${arr[0]}", "${arr[1]}" also

