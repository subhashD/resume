#!/bin/bash

SCRIPT_PATH=$(cd "$(dirname "$0")" && pwd)
JSON_CONTENT=$(cat $SCRIPT_PATH/resume.json)

USER_NAME=$(echo $JSON_CONTENT | jq -r '.name')
LAYOUT_PDF=$(echo $JSON_CONTENT | jq -r '.layout.pdf')

PAGE_SIZE=$(echo $LAYOUT_PDF | jq -r '.size')
DPI=$(echo $LAYOUT_PDF | jq -r '.dpi')

LEFT_MARGIN=$(echo $LAYOUT_PDF | jq -r '.margins.left')
RIGHT_MARGIN=$(echo $LAYOUT_PDF | jq -r '.margins.right')
TOP_MARGIN=$(echo $LAYOUT_PDF | jq -r '.margins.top')
BOTTOM_MARGIN=$(echo $LAYOUT_PDF | jq -r '.margins.bottom')

SOURCE=$(echo $LAYOUT_PDF | jq -r '.source')
DESTINATION_FILE="$USER_NAME - Resume.pdf"
DESTINATION_DIR=$(echo $SCRIPT_PATH | sed 's%/[^/]*$%/%')
DESTINATION=$DESTINATION_DIR$DESTINATION_FILE

PDF_COMMAND="
	wkhtmltopdf -q
	--dpi $DPI
	--page-size $PAGE_SIZE
	-L $LEFT_MARGIN -R $RIGHT_MARGIN -T $TOP_MARGIN -B $BOTTOM_MARGIN
	$SOURCE -
"

if [ "$1" = "--server" ]
	then
		echo "Content-type:application/pdf"
		echo "Content-disposition:inline;filename=$DESTINATION_FILE"
		echo ""
		$(echo $PDF_COMMAND)
	else
		echo "Source: $SOURCE"
		echo "Destination: $DESTINATION"
		$($PDF_COMMAND > "$DESTINATION")
		echo "Done"
fi
