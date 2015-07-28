#!/bin/bash

JSON_CONTENT=$(cat resume.json)

USER_NAME=$(echo $JSON_CONTENT | jq -r '.name')
LAYOUT_PDF=$(echo $JSON_CONTENT | jq -r '.layout.pdf')

PAGE_SIZE=$(echo $LAYOUT_PDF | jq -r '.size')
DPI=$(echo $LAYOUT_PDF | jq -r '.dpi')

LEFT_MARGIN=$(echo $LAYOUT_PDF | jq -r '.margins.left')
RIGHT_MARGIN=$(echo $LAYOUT_PDF | jq -r '.margins.right')
TOP_MARGIN=$(echo $LAYOUT_PDF | jq -r '.margins.top')
BOTTOM_MARGIN=$(echo $LAYOUT_PDF | jq -r '.margins.bottom')

SOURCE_FILE=$(echo $LAYOUT_PDF | jq -r '.source')
DESTINATION_FILE=$(echo $LAYOUT_PDF | jq -r '.destination')

OUTPUT_PDF="wkhtmltopdf -q
	--dpi $DPI
	--page-size $PAGE_SIZE
	-L $LEFT_MARGIN -R $RIGHT_MARGIN -T $TOP_MARGIN -B $BOTTOM_MARGIN
	$SOURCE_FILE -
"

if [ "$1" = "--server" ]
	then
		echo "Content-type:application/pdf"
		echo "Content-disposition:inline;filename=$USER_NAME - Resume.pdf"
		echo ""
		echo $($OUTPUT_PDF)
	else
		echo "Source: $SOURCE_FILE"
		echo "Destination: $DESTINATION_FILE"
		$($OUTPUT_PDF > $DESTINATION_FILE)
		echo "Done"
fi
