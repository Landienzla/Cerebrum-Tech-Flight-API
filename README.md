
<a href="https://gold-comet-617949.postman.co/workspace/New-Team-Workspace~9b917001-f3d0-4d87-ba49-ab46725cb4dd/api/d414dfc7-ff51-4966-8653-dd368b65e48b?action=share&creator=17655551" target="_blank">Postman API Doc</a>

<h2>Getting Started</h2>
<ol>
    <li><strong>Clone the Repository</strong>
        <pre><code>git clone https://github.com/Landienzla/express-boilerplate.git
cd express-boilerplate</code></pre>
    </li>
     <li><strong>Create and Fill the .env File</strong>
        <p>Before starting, create a <code>.env</code> file at the root of the project. You need to set <code>GMAIL_ADDRESS</code> and <code>GMAIL_PASSWORD</code> environment variables for sending email verification mails. If these are not provided, make sure to read the documentation carefully for alternative configurations.</p>
    </li>
    <li><strong>Install Dependencies</strong>
        <pre><code>npm install</code></pre>
    </li>
    <li><strong>Set up PostgreSQL Database</strong>
        <p>Make sure you have PostgreSQL installed and running. Update the database connection details in the configuration file.</p>
    </li>
    <li><strong>Start the Development Server</strong>
        <pre><code>npm run develop</code></pre>
    </li>
</ol>

<p>Your application should now be running at <a href="http://localhost:3001">http://localhost:3001</a>.</p>

<h2>Directory Structure</h2>
<p>Briefly describe the layout of your project, e.g.,</p>
<ul>
    <li><code>src/</code>: All the TypeScript server code resides here.
        <ul>
            <li><code>routes/</code>: Contains Express route definitions for the various API endpoints.</li>
            <li><code>controllers/</code>: Houses the logic for handling requests and responses for each route. Controllers are responsible for interfacing between the API routes and the database models.</li>
            <li><code>middlewares/</code>: Includes middleware functions used across the application. Middlewares are used for tasks like request processing, authentication, error handling, and other common functions that are executed during the HTTP request-response cycle.</li>
            <li><code>utils/</code>: Utility functions that provide common functionalities used throughout the application, such as helper functions, data formatting, and other shared logic.</li>
        </ul>
    </li>
</ul>
