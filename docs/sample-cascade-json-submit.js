const doImageSubmit = async (postername, imageData, filename, form) => {
    // no need to check if cascade already has a file named this; it renames automatically
    const thisYear = new Date().getFullYear();
    const jsonData = {
        "asset": {
            "workflowConfiguration": {
                "workflowName": "posters-new: api-image-autopublish " + postername,
                "workflowDefinitionId": "31d60c9eac1e005871a7726396290fc1", // This is the workflow for autopublish. The posters workflow is "1ebf2fd8ac1e00585fa479f120aefcd8",
                "workflowComments": "This workflow was created automatically by the ead_SubmitPoster process."
            },
            "file": {
                "data": Object.values(imageData[1]), // poster[0] is the image format data, poster[1] is the data, but it comes in here as JSON and has to convert back to an array.
                "rewriteLinks": false,
                "linkRewriting": "inherit",
                "shouldBePublished": true,
                "shouldBeIndexed": true,
                "expirationFolderPath": "archives/archives-" + thisYear,
                "expirationFolderRecycled": false,
                "metadataSetId": "31d60d35ac1e005871a77263d049a07b",
                "metadataSetPath": "Page",
                "metadata": {
                    "endDate": "" + dateToUTCCode(form.display_end_date, form.timezoneOffset),
                    "startDate": "" + dateToUTCCode(form.display_start_date, form.timezoneOffset),
                    "dynamicFields": [
                        {
                            "name": "sideNavInclude",
                            "fieldValues": [
                                {
                                    "value": "yes"
                                }
                            ]
                        }
                    ]
                },
                "reviewOnSchedule": false,
                "reviewEvery": 180,
                "parentFolderId": "1ecff673ac1e00585fa479f190d6cfad",
                "parentFolderPath": "_media-library/posters",
                "path": "_media-library/posters/" + filename,
                "siteId": "31d5ca2cac1e005871a772635f1d38a9",
                "siteName": "Posters",
                "tags": [],
                "name": filename,
                "id": "323efbe3ac1e00581c0bd719d4034a14"
            }
        }
    }
    // Basic Authentication credentials
    logger.debug('Fetching password');
    const username = 'restservices';
    const password = await Params.fetchCascadeAPIPassword();
    logger.debug('Password fetched');

    // Create a Base64-encoded 'username:password' string
    const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

    let returnData = {};
    try {
        logger.debug('Sending poster to Cascade...')
        const response = await axios.post('https://stthomas.cascadecms.com/api/v1/create', jsonData, {
            headers: {
                'Authorization': `Basic ${basicAuth}`,
                'Content-Type': 'application/json'
            }
        });
        logger.info('Poster Image: transmission Success:', util.inspect(response));
        if (!response.data.createdAssetId) {
            console.error("Poster Image: No createdAssetId in response. Response likely failed.")
        } else {
            logger.info('Poster Image: image created: ' + response.data.createdAssetId);
        }
        returnData.status = 200;
        returnData.payload = response.data;
    } catch (error) {
        console.error('Poster Image: Error:', error);
        returnData.status = 500;
        returnData.payload = error;
    }
    return returnData;
}