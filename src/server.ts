import app from "./app";
// @ts-ignore
import { logInfo } from "./utils/logger";

const port = process.env.PORT || 3001;
app.listen(port);
logInfo(`Server listening on port ${port}`);
