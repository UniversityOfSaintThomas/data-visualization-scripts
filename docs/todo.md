- create a repo with the sample file (data visualization), have a script. Codebuild only pipeline that runs and executes
    - use python script
    - patric (development office), he has a report, and he’s able to output that report in json format. He wrote the report that generates the json file of contributions and stuff. His script runs to update the json file (campaign data), what you all need to do is run codebuild to run the python script, sending a post request to the cascade media folder (media folder is basically a static file store)
    - you can hardcode stuff (of cascade folder id, etc), but make sure to do it on top of the file
    - add error messaging and console loggings as well
        - use a logger instead of a print the error, because some systems might ignore all logs and warns if set to show only errors. Logger adds another layer that determintively displays the log in the console regardless
        - loggers can also take an error, and can format it in ways (you can output your errors as json, something that can be used in cloudwatch logs)
- Variables to use for the script to post to cascade:
    - "parentFolderId": "b7cf0264ac1e0058359024b78ae125ff"
    "parentFolderPath": "_media-library/documents/comprehensive-campaign"
    "siteId": "2a39283bac1e00581cb152c85a7eb671"
    "siteName": "Give"
- we don’t want to be installing external packages for this python script
- error handling:
    - try retry (if failed once, wait sometime then try again. If it fails again, error response code. Try to give some sort of reason as to why the script failed and print that out in the logs
- where we’ll store the api key for cascade:
    - make it modular, so create like a function within your python that’s like def get_key(), that should call another function get_key_from_ssm() (like a service function). No matter where it gets the api key, it expects to return a string
-