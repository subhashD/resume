#!/bin/bash

PAGE_SIZE=$(cat resume.json | jq -r '.layout.pdf.size')

LEFT_MARGIN=$(cat resume.json | jq '.layout.pdf.margins.left')
RIGHT_MARGIN=$(cat resume.json | jq '.layout.pdf.margins.right')
TOP_MARGIN=$(cat resume.json | jq '.layout.pdf.margins.top')
BOTTOM_MARGIN=$(cat resume.json | jq '.layout.pdf.margins.bottom')

SOURCE_FILE=$(cat resume.json | jq -r '.layout.pdf.source')
DESTINATION_FILE=$(cat resume.json | jq -r '.layout.pdf.destination')

ARGUMENTS=""

if [ "$1" = "--server" ]
	then
		USER_NAME=$(cat resume.json | jq -r '.name')
		FILE_NAME="$USER_NAME - Resume.pdf"
		DESTINATION_FILE="-"
		ARGUMENTS="-q"
		echo "Content-type:application/pdf"
		echo "Content-disposition:inline;filename=$FILE_NAME"
		echo ""
fi

wkhtmltopdf \
	$ARGUMENTS \
	--page-size $PAGE_SIZE \
	-L $LEFT_MARGIN -R $RIGHT_MARGIN -T $TOP_MARGIN -B $BOTTOM_MARGIN \
	$SOURCE_FILE \
	$DESTINATION_FILE
