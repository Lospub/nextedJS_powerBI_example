# nextedJS_powerBI_example

This is the repo to show the skill to embed PowerBi to a simple nextJS application. 

## Preprocess

power bi ==> admin portal ==> tenant setting ==> developer setting ==> Developer settings ==> Enabled Service principals can use Fabric APIs
             ==> Specific security groups (better to choose)
         ==> add AAD app to workspace
         ==> workspace(group) ==> report ID (can be find in embaded url)
Azure AD ==> go to Microsoft Entra ID ==> create app ==> set permission ==> create certification & secrets ==> add owner?
                                      ==> groups ==> add security group ==》 add application member
securty group in AAD and PBI should be the same one

get token:
step 1 get bearer token: 
API：       POST https://login.microsoftonline.com/{tantent ID？}/oauth2/v2.0/token
       body： grant_type	    client_credentials	                                Defines the grant type, which is set to client_credentials for this type of request.
              client_id	    <your_client_id>	                                The client ID associated with your Azure AD application.
              client_secret	<your_client_secret>	                            The client secret generated for the Azure AD application.
              scope	        https://analysis.windows.net/powerbi/api/.default	Specifies the API scope required for Power BI API access.
     get token in return message
step 2 get access token:
API:        POST https://api.powerbi.com/v1.0/myorg/groups/{groupId}/reports/{reportId}/GenerateToken
       body:  
             accessLevel	        TokenAccessLevel         The required access level for embed token generation
             allowSaveAs          boolean                  Whether an embedded report can be saved as a new report. The default value is false. Only applies when you generate an embed token for report embedding.
             datasetId            string                   The dataset ID used for report creation. Only applies when you generate an embed token for report creation.
             identities	        EffectiveIdentity[]      A list of identities to use for row-level security rules
             lifetimeInMinutes	integer                  The maximum lifetime of the token in minutes, starting from the time it was generated. Can be used to shorten the expiration time of a token, but not to extend it. The value must be a positive integer. Zero (0) is equivalent to null and will be ignored, resulting in the default expiration time.
     get embaded access token we need

embaded to React