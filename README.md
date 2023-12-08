# Discord Bot: Currency Change Notifications via Google Sheets API

## Overview

This project focuses on building a Discord bot that integrates seamlessly with the Google Sheets API. Its primary function is to provide users with notifications about currency changes sourced from Google Sheets directly within Discord.

## Features

- **Real-time Notifications:** Receive immediate alerts within Discord when a scheduled time is executed by a cron-job, triggered by the cron-job service. The bot fetches and updates data in the linked Google Sheets according to the schedule.
- **Google Sheets Integration:** Seamlessly connect and retrieve currency data stored in Google Sheets directly within the Discord platform.
- **Customization:** Tailor the bot's functionality to notify specific channels or user groups based on currency fluctuations or specific schedule changes.


## Usage
- Create **.env** file (see the sample at **env.sample**)
- Generate **credentails.json**, get from [Google sheet API](https://developers.google.com/sheets/api/quickstart/js)
-  ```npm install```
- ```npm run dev``` or ```npm run start```

## Incorporation of External Code

This project incorporates code from [google-api-nodejs-client GitRepo](https://github.com/googleapis/google-api-nodejs-client/tree/main), licensed under the Apache License, Version 2.0.

### Attribution

This project incorporates code from [quickstart.js](https://github.com/googleapis/google-api-nodejs-client/blob/main/samples/sheets/quickstart.js), licensed under the Apache License, Version 2.0.

```plaintext
/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 ```

The code integration from [quickstart.js](https://github.com/googleapis/google-api-nodejs-client/blob/main/samples/sheets/quickstart.js) can be found within the [/sheet/helper.js](./sheet/sheet.helper.js) file in this repository.