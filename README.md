# sk-ftp
My ftp helper class to upload and delete files through ftp
## Installation
`npm install --save sk-ftp`

## Usage
``` 
const SkFTP = require("sk-ftp")
const ftp = new SkFTP("ftpHost", "ftpUser", "ftpPassword");
```

## Methods
### ftp.upload(fileObject, remoteLocation)
``` 
fileObject: Multipart file object. e.g: form.files.image
type: Object
required: Yes

remoteLocation: ftp upload path
type: Array
required: No
default: /

Response (Promise)
Error first {error: true / false, message:"error message"}
Successful upload: {uploaded: true, filename: "uploadedFile.zip"}
```

### ftp.delete(fileName, remoteLocation)
```
//delete from s3 bucket
fileName: The filename of the resource to delete
type: String
required: Yes

remoteLocation: ftp path
type: Array
required: No
default: /

Response (Promise)
Error first {error: true / false, message:"error message"}
Successful deletion: {deleted: true}
```

