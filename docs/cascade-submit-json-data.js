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