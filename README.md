
<a href="https://www.postman.com/gold-comet-617949/workspace/new-team-workspace/api/d414dfc7-ff51-4966-8653-dd368b65e48b?action=share&creator=17655551" target="_blank">Postman API Doc</a>

<h2>Getting Started</h2>
<ol>
    <li><strong>Clone the Repository</strong>
        <pre><code>git clone https://github.com/Landienzla/Cerebrum-Tech-Flight-API.git
cd Cerebrum-Tech-Flight-API</code></pre>
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
    <li><strong>Build and Run the Application</strong>
    <ol>
        <li>Build the application by running:
            <pre><code>npm run build</code></pre>
        </li>
        <li>Start the application in production mode using:
            <pre><code>npm run start:prod</code></pre>
        </li>
    </ol>
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


## Application Capabilities



This application offers a comprehensive suite of features for handling flight-related operations, user authentication, and reservation management. Below is an overview of the core functionalities:



### User Authentication and Management

- **User Registration and Login**: Secure registration and login processes for users.

- **Email Verification**: After registering, users receive an email verification link to ensure the authenticity of their email address.



### Flight Information

- **Flight Listing**: Users can view a list of available flights. The listing functionality includes various filters for ease of searching.

- **Flight Details**: Detailed information about specific flights can be accessed, providing users with comprehensive data about flight schedules, durations, and more.



### Reservation System

- **Making Flight Reservations**: Users can make reservations on available flights, choosing their preferred seats.

- **Cancelling Reservations**: Users have the flexibility to cancel their reservations if their plans change.

- **Listing User Reservations**: Users can view all their reservations, both past and upcoming, in one place.

- **Reservation Details**: Detailed view of a specific reservation, including flight details, seat number, and reservation status.

